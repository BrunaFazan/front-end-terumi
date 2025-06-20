import React from "react";

import styled from "styled-components";

import { useNavigate, useLocation } from "react-router-dom";

import { useEffect, useState } from "react";



const Aside = styled.aside`
  width: 200px;
  background: #3b0a0a;
  color: white;
  padding: 1rem;
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
  gap: 1rem;
`;


const LinhaTitulo = styled.div`
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, #fff, #777);
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  border: none;
  border-radius: 2px;
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

const Conteudo = styled.div`
  position: relative;
  z-index: 2;
  height: 100vh;
  display: flex;
`;

const BotaoEnviar = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #8b0000;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #a60000;
  }
`;

const PopupConfirmacao = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: #4caf50;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  font-weight: bold;
  z-index: 1000;
  animation: fadeOut 0.3s ease-in-out;
`;



export default function CadastroProduto() {
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [produtos, setProdutos] = useState([]);

useEffect(() => {
  // simulação: substitua isso por fetch() no futuro
  const mockCategorias = [
    { id: 1, nome: "Entradas" },
    { id: 2, nome: "Combinados" },
    { id: 3, nome: "Temakis" },
    { id: 4, nome: "Bebidas" },
  ];
  setCategorias(mockCategorias);
}, []);

useEffect(() => {
  const mockProdutos = [
    { id: 1, nome: "Sushi Salmão" },
    { id: 2, nome: "Hot Roll" },
    { id: 3, nome: "Temaki Atum" },
    { id: 4, nome: "Combinado Especial" },
    { id: 5, nome: "Coca-Cola" }, //quando for bebidas filtrar no banco para aparecerem só bebidas aqui 
  ];
  setProdutos(mockProdutos);
}, []);


  const location = useLocation();
  const navigate = useNavigate(); //navegação entre as páginas
  const [preco, setPreco] = useState(""); //pro preço aparecer como moeda

  function formatarParaReal(valor) {
  const numero = parseFloat(valor.replace(/[^0-9]/g, "")) / 100;
  return numero.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}



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
          <h2>Cadastro de Produtos</h2>
          <LinhaTitulo />
          <form   onSubmit={(e) => {
              e.preventDefault();
              setMostrarConfirmacao(true); //pop-up temporario
              setTimeout(() => {
                setMostrarConfirmacao(false);
              }, 3000); // desaparece após 3 segundos
                }} style={{ marginTop: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <select style={{ padding: "0.5rem" }}>
                      <option value="">Selecione uma categoria</option>
                        {categorias.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.nome}
                        </option>
                    ))}
                </select>
                <select style={{ padding: "0.5rem" }}>
                    <option value="">Selecione o produto</option>
                    {produtos.map((produto) => (
                        <option key={produto.id} value={produto.id}>
                          {produto.nome}
                        </option>
                    ))}
                </select>

                <input placeholder="Descrição" style={{ padding: "0.5rem" }} />
                <input
                      placeholder="Preço"
                      style={{ padding: "0.5rem" }}
                        value={preco}
                          onChange={(e) => {
                            const valorDigitado = e.target.value;
                            setPreco(formatarParaReal(valorDigitado));
                          }}
                  />

                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem" }}>Imagem do produto</label>
                  <input type="file" />
                </div>
                    <div style={{ gridColumn: "span 2", display: "flex", justifyContent: "flex-end" }}>
              <BotaoEnviar type="submit">Enviar</BotaoEnviar>
              </div> 
          </form>
            {mostrarConfirmacao && (
                <PopupConfirmacao>Produto enviado com sucesso!</PopupConfirmacao>
              )}

        </main> 
      </Conteudo>
    </>
  );
}

