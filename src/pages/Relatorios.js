import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

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

const LinhaTitulo = styled.div`
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, #ffffff, #888888);
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  border-radius: 2px;
`;

const Botao = styled.button`
  background-color: #8b0000;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #a60000;
  }
`;

const Conteudo = styled.div`
  position: relative;
  z-index: 2;
  height: 100vh;
  display: flex;
`;

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function exportarParaExcel(dados, nomeDoArquivo = "relatorio.xlsx") {
  const planilha = XLSX.utils.json_to_sheet(dados);
  const livro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(livro, planilha, "Relatório");
  const excelBuffer = XLSX.write(livro, { bookType: "xlsx", type: "array" });
  const arquivo = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(arquivo, nomeDoArquivo);
}


export default function Relatorios() {
  const navigate = useNavigate();
  const location = useLocation();

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
          <SidebarItem $active={location.pathname === "/cadastro-produto"} onClick={() => navigate("/cadastro-produto")}>
            Cadastro de produtos
          </SidebarItem>
          <SidebarItem $active={location.pathname === "/relatorios"} onClick={() => navigate("/relatorios")}>
            Relatórios
          </SidebarItem>
          <SidebarItem $active={location.pathname === "/clientes"} onClick={() => navigate("/clientes")}>
            Clientes
          </SidebarItem>
             <SidebarItem $active={location.pathname === "/registro-pedido"}onClick={() => navigate("/registro-pedido")} >
             Registro de pedido
            </SidebarItem>
          <SidebarItem $active={location.pathname === "/cadastro-clientes"} onClick={() => navigate("/cadastro-clientes")} >
             Cadastro de clientes
          </SidebarItem>
        </SidebarMenu>
      </Aside>

      <main style={{ flex: 1, padding: "2rem", color: "white" }}>
        <h2>Relatórios</h2>
        <LinhaTitulo />

        {/* Relatório por período */}
        <div style={{ marginBottom: "2rem" }}>
          <label>Relatório de vendas</label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
            <input type="date" />
            até
            <input type="date" />
            <Botao>Extrair relatório</Botao>
          </div>
        </div>

        {/* Relatório semanal */}
        <div>
          <label>Relatório de vendas</label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
            <select>
              <option>Semanal</option>
              <option>Mensal</option>
              <option>Personalizado</option>
            </select>
            <Botao onClick={() => exportarParaExcel(dados)}>Exportar Excel</Botao>
          </div>
        </div>
      </main>
    </Conteudo>
    </>
  );
}
