import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

// Componentes de layout reutilizados
const Aside = styled.aside`
  width: 200px;
  background: #3b0a0a;
  color: white;
  padding: 1rem;
`;

const Fundo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-image: url("/sushi.png");
  background-size: cover;
  background-position: center;
  z-index: 0;
`;

const Sobreposicao = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-image: url("/sheerwhite.png");
  background-size: cover;
  background-position: center;
  opacity: 0.9;
  z-index: 1;
`;

const SidebarItem = styled.div`
  font-weight: bold;
  background: ${(props) => (props.$active ? "#000" : "#3b0a0a")};
  padding: 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin-bottom: 1rem;

  &:hover {
    background: #8b0000;
  }
`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Conteudo = styled.div`
  position: relative;
  z-index: 2;
  height: 100vh;
  display: flex;
`;

const LinhaTitulo = styled.div`
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, #ffffff, #888888);
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  border-radius: 2px;
`;

export default function Clientes() {
  const navigate = useNavigate();
  const location = useLocation();

  // Estado para simular os dados vindos do backend
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);

  useEffect(() => {
    // Simulação de dados
    const dadosMock = [
      {
        id: 1,
        nome: "João",
        pedidos: [
          { id: 101, itens: [{ nome: "Temaki", quantidade: 2 }, { nome: "Sushi", quantidade: 4 }] },
          { id: 102, itens: [{ nome: "Yakissoba", quantidade: 1 }] }
        ]
      },
      {
        id: 2,
        nome: "Maria",
        pedidos: [
          { id: 201, itens: [{ nome: "Sashimi", quantidade: 3 }] }
        ]
      }
    ];
    setClientes(dadosMock);
  }, []);
  
  const [filtroNome, setFiltroNome] = useState("");

   return (
    <>
      <Fundo />
      <Sobreposicao />
      <Conteudo>
      <Aside>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <img src="/MaleUser.svg" alt="Perfil" style={{ width: "60px" }} />
        </div>
        <SidebarMenu>
         <SidebarItem
                  $active={location.pathname === "/cadastro-produto"}
                  onClick={() => navigate("/cadastro-produto")}
                >
                  Cadastro de produtos
                </SidebarItem>

                    <SidebarItem
                      $active={location.pathname === "/relatorios"}
                      onClick={() => navigate("/relatorios")}
                    >
                      Relatórios
                    </SidebarItem>

                    <SidebarItem
                      $active={location.pathname === "/clientes"}
                      onClick={() => navigate("/clientes")}
                    >
                      Clientes
                    </SidebarItem>

                    <SidebarItem
                      $active={location.pathname === "/registro-pedido"}
                      onClick={() => navigate("/registro-pedido")}
                    >
                      Registro de pedido
                    </SidebarItem>

                    <SidebarItem
                      $active={location.pathname === "/cadastro-clientes"}
                      onClick={() => navigate("/cadastro-clientes")}
                    >
                      Cadastro de clientes
                    </SidebarItem>
        </SidebarMenu>
      </Aside>

      <main style={{ flex: 1, padding: "2rem", color: "white" }}>
  <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>Clientes</h2>
  <LinhaTitulo />
 <label htmlFor="filtro" style={{ fontWeight: "bold", marginBottom: "0.25rem", display: "block" }}>
  Buscar cliente por nome:
</label>
<input
  id="filtro"
  type="text"
  placeholder="Digite o nome do cliente"
  value={filtroNome}
  onChange={(e) => setFiltroNome(e.target.value)}
  style={{
    padding: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "1.5rem",
    width: "250px"
  }}
/>

{clientes
  .filter((c) =>
    c.nome.toLowerCase().includes(filtroNome.toLowerCase())
  )
  .map((clienteFiltrado) => (
    <div key={clienteFiltrado.id}>
      <h3 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>{clienteFiltrado.nome}</h3>
      {clienteFiltrado.pedidos.map((pedido, index) => (
        <div
          key={pedido.id}
          style={{
            backgroundColor: "#5c5c5c",
            borderRadius: "10px",
            padding: "1rem",
            marginBottom: "1rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.3)"
          }}
        >
          <strong style={{ display: "block", marginBottom: "0.5rem" }}>Pedido {index + 1}</strong>
          {pedido.itens.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "0.25rem",
                marginLeft: "1rem"
              }}
            >
              <span style={{ flex: "1" }}>{item.nome}</span>
              <input
                value={item.quantidade}
                readOnly
                style={{
                  width: "50px",
                  padding: "0.4rem",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#eee",
                  textAlign: "center"
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
))}


  {clienteSelecionado && (
    <div>
      <h3 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>Histórico de pedidos:</h3>
      {clienteSelecionado.pedidos.map((pedido, index) => (
        <div
          key={pedido.id}
          style={{
            backgroundColor: "#5c5c5c",
            borderRadius: "10px",
            padding: "1rem",
            marginBottom: "1rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.3)"
          }}
        >
          <strong style={{ display: "block", marginBottom: "0.5rem" }}>Pedido {index + 1}</strong>
          {pedido.itens.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "0.25rem",
                marginLeft: "1rem"
              }}
            >
              <span style={{ flex: "1" }}>{item.nome}</span>
              <input
                value={item.quantidade}
                readOnly
                style={{
                  width: "50px",
                  padding: "0.4rem",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#eee",
                  textAlign: "center"
                }}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  )}
</main>
    </Conteudo>
     </>
  );
}
