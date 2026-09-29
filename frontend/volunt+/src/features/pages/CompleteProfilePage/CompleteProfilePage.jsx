import { useState } from "react";
import { useAuth, useUser } from "@clerk/react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { registerIndividual, registerOrganization } from "../../../api/usersApi";
import { useCurrentUser } from "../../../context/CurrentUserContext";
import "./CompleteProfilePage.css";

export default function CompleteProfilePage() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user: clerkUser } = useUser();
  const { user, refreshUser } = useCurrentUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    personType: "INDIVIDUAL", role: "BENEFICIARY", fullName: "",
    birthDate: "", gender: "", organizationName: "", cnpj: "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  if (!isLoaded) return <p>Carregando...</p>;
  if (!isSignedIn) return <Navigate to="/login" replace />;
  if (user) return <Navigate to="/perfil" replace />;

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  }

  async function submit(event) {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setError("");
    try {
      const token = await getToken();
      if (!token) throw new Error("Sua sessão expirou. Entre novamente.");
      if (form.personType === "ORGANIZATION") {
        await registerOrganization({
          organizationName: form.organizationName.trim(),
          cnpj: form.cnpj.replace(/\D/g, "") || null,
        }, token);
      } else {
        await registerIndividual({
          fullName: form.fullName.trim(), birthDate: form.birthDate,
          gender: form.gender, initialRole: form.role,
        }, token);
      }
      await refreshUser(token);
      navigate("/perfil", { replace: true });
    } catch (failure) {
      if (failure?.response?.status === 409) {
        try {
          await refreshUser();
          navigate("/perfil", { replace: true });
          return;
        } catch { /* Mostra a falha original abaixo. */ }
      }
      setError(failure?.response?.data?.detail || failure.message || "Não foi possível salvar seu perfil.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="complete-profile">
      <section>
        <Link to="/explorar">← Voltar ao catálogo</Link>
        <h1>Complete seu perfil</h1>
        <p>Sua conta {clerkUser?.primaryEmailAddress?.emailAddress} está ativa. Escolha como deseja participar.</p>
        <form onSubmit={submit}>
          <label>Tipo de conta
            <select value={form.personType} onChange={(event) => update("personType", event.target.value)}>
              <option value="INDIVIDUAL">Pessoa física</option>
              <option value="ORGANIZATION">Organização ofertante</option>
            </select>
          </label>
          {form.personType === "ORGANIZATION" ? <>
            <label>Nome da organização
              <input required maxLength={255} value={form.organizationName} onChange={(event) => update("organizationName", event.target.value)} />
            </label>
            <label>CNPJ (opcional)
              <input inputMode="numeric" value={form.cnpj} onChange={(event) => update("cnpj", event.target.value)} />
            </label>
          </> : <>
            <label>Nome completo
              <input required maxLength={255} value={form.fullName} onChange={(event) => update("fullName", event.target.value)} />
            </label>
            <label>Data de nascimento
              <input required type="date" value={form.birthDate} onChange={(event) => update("birthDate", event.target.value)} />
            </label>
            <label>Gênero
              <select required value={form.gender} onChange={(event) => update("gender", event.target.value)}>
                <option value="">Selecione</option><option value="FEMALE">Feminino</option>
                <option value="MALE">Masculino</option><option value="NON_BINARY">Não binário</option>
                <option value="OTHER">Outro</option><option value="PREFER_NOT_TO_SAY">Prefiro não informar</option>
              </select>
            </label>
            <label>Perfil
              <select value={form.role} onChange={(event) => update("role", event.target.value)}>
                <option value="BENEFICIARY">Beneficiário</option><option value="OFFERER">Ofertante</option>
              </select>
            </label>
          </>}
          {error && <p role="alert">{error}</p>}
          <button type="submit" disabled={saving}>{saving ? "Salvando..." : "Salvar perfil"}</button>
        </form>
      </section>
    </main>
  );
}
