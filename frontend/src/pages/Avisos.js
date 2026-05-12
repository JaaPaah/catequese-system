import React, { useEffect, useState } from "react";
import api from "../services/api";

function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type}`}>
      {type === "error" ? "❌" : "✅"} {msg}
    </div>
  );
}

export default function Avisos() {
  const empty = {
    prio: "",
    title: "",
    description: "",
    data: "",
    author: "",
    bulletinType: "",
  };

  const [toast, setToast] = useState(null);
  const [form, setForm] = useState(empty);
  const [lista, setLista] = useState([]);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);

  const fetchAvisos = async () => {
    try {
      const response = await api.get("/avisos");
      setLista(response.data);
    } catch (error) {
      setToast({
        msg: "Erro ao carregar avisos",
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchAvisos();
  }, []);

  const validate = (field, value) => {
    if (!value || value.trim() === "") {
      return `${field} não pode ser vazio`;
    }

    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validate(name, value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const error = validate(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    Object.keys(form).forEach((field) => {
      newErrors[field] = validate(field, form[field]);
    });

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      setToast({
        msg: "Corrija os campos do formulário",
        type: "error",
      });

      return;
    }

    try {
      if (editingId !== null) {
        await api.put(`/avisos/${editingId}`, form);

        setToast({
          msg: "Aviso atualizado com sucesso",
          type: "success",
        });
      } else {
        await api.post("/avisos", form);

        setToast({
          msg: "Aviso criado com sucesso",
          type: "success",
        });
      }

      setForm(empty);
      setEditingId(null);
      setTouched({});
      setErrors({});

      fetchAvisos();
    } catch (error) {
      setToast({
        msg: "Erro ao salvar aviso",
        type: "error",
      });
    }
  };

  const handleEdit = (aviso) => {
    window.scrollTo({
     top: 0,
    behavior: "smooth",
    });
    setForm({
      prio: aviso.prio,
      title: aviso.title,
      description: aviso.description,
      data: aviso.data,
      author: aviso.author,
      bulletinType: aviso.bulletinType,
    });

    setEditingId(aviso.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/avisos/${id}`);

      setLista((prev) => prev.filter((item) => item.id !== id));

      setToast({
        msg: "Aviso removido",
        type: "success",
      });
    } catch (error) {
      setToast({
        msg: "Erro ao excluir aviso",
        type: "error",
      });
    }
  };

  const fieldStatus = (name) => {
    if (!touched[name]) return "";

    return errors[name] ? "error" : "success";
  };

  return (
    <>
      <h1>Mural de Avisos</h1>

      <form onSubmit={handleSubmit}>

{[

    
    {name: "prio", label: "Prioridade", type: "select",},
    {name: "title", label: "Título", type: "text", placeholder: "Título do aviso",},
    {name: "description", label: "Descrição", type: "textarea", placeholder: "Descrição do aviso",},
    {name: "data",label: "Data",type: "date",},
    {name: "author", label: "Autor", type: "text", placeholder: "Autor do aviso",},
    {name: "bulletinType", label: "Tipo de aviso", type: "text", placeholder: "Ex: Catequese, Eventos, etc.",},
].map(({ name, label, type, placeholder }) => (
  <label key={name} htmlFor={name}>
    {label}
    {type === "select" ? (
      <select
        id={name}
        name={name}
        value={form[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        className={fieldStatus(name)}
      >
        <option value="">Selecione</option>
        <option value="Alta">Alta</option>
        <option value="Média">Média</option>
        <option value="Baixa">Baixa</option>
      </select>
    ) : type === "textarea" ? (
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        value={form[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        className={fieldStatus(name)}
        rows={6}
      />
    ) : (
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={form[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        className={fieldStatus(name)}
      />
    )}

  </label>
))}
        <div className="buttons">
        <button type="submit">
            {editingId ? "Atualizar Aviso" : "Criar Aviso"}
        </button>

        <button
            type="button"
            className="secondary"
            onClick={() => {
            setForm(empty);
            setTouched({});
            setErrors({});
            setEditingId(null);
            }}
        >
            Limpar
        </button>
        </div>
      </form>

      <div className="avisos">
        {lista.map((aviso) => (
          <div key={aviso.id} className={`card ${(aviso.prio || "").toLowerCase()}`}>
            <div className="top">
              <h2>{aviso.title}</h2>

              <span className="badge">{aviso.prio}</span>
            </div>

            <p>{aviso.description}</p>

            <div className="info">
              <small>📌 {aviso.bulletinType}</small>
              <small> 📅 {new Date(aviso.data).toLocaleDateString("pt-BR")}</small>
              <small>👤 {aviso.author}</small>
            </div>

            <div className="actions">
              <button type = "button" onClick={() => handleEdit(aviso)}>
                Editar
              </button>

              <button 
              type = "button"
                className="delete"
                onClick={() => handleDelete(aviso.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {toast && (
        <Toast
          msg={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}