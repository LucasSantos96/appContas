"use client"; // necessário para usar hooks no Next.js App Router

import React, { useEffect, useRef, useState } from "react";
import Input from "../components/Input";   // componente de input customizado
import Button from "../components/Button"; // componente de botão customizado

const Index = () => {
  // === ENTRADA DE VALORES ===
  const inputRef = useRef(""); // referência ao input de entrada
  useEffect(() => {
    inputRef.current.focus(); // foca automaticamente no input ao carregar
  }, []);

  const [saldoCad, setSaldoCad] = useState(""); // valor digitado para entrada
  const [saldo, setSaldo] = useState(0);        // valor total em saldo
  const [mensagem, setMensagem] = useState(""); // mensagem de erro

  const handleCad = (e) => {
    e.preventDefault();
    const numero = parseFloat(saldoCad); // transforma string em número

    if (!numero) {
      setMensagem("❌ Digite um valor para cadastrar! ❌");
      return;
    } else {
      setMensagem("");
    }

    // soma o valor ao saldo total
    setSaldo((prevTotal) => parseFloat(prevTotal + numero));
    setSaldoCad(""); // limpa o input
  };

  // === SAÍDAS (GASTOS) ===
  const [valorSaida, setValorSaida] = useState('');   // valor da saída
  const [saidas, setSaidas] = useState([]);           // lista de saídas
  const [descricao, setDescricao] = useState("");     // descrição do gasto
  const [categoria, setCategoria] = useState("");     // categoria escolhida

  const handleSaida = (e) => {
    e.preventDefault();

    const numero = saldo; // pega saldo atual

    const novaSaida = {
      id: Date.now(), // gera id único
      valor: parseFloat(valorSaida),
      categoria,
      descricao,
    };

    setSaidas(prev => [...prev, novaSaida]); // adiciona nova saída à lista

    // subtrai a saída do saldo total
    setSaldo(numero - valorSaida);

    // limpa os campos do formulário
    setDescricao('');
    setValorSaida('');
  };

  return (
    <main className="mx-4 flex flex-col gap-4 text-[#4d4c4c] lg:mx-32">
      {/* HEADER COM SALDO */}
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">AppGastos</h1>
        {saldo > 0 ? (
          <p className="text-green-400 font-bold bg-green-200 rounded-sm p-2 border border-green-500">
            Saldo R$: {saldo.toFixed(2)}
          </p>
        ) : (
          <p className="text-red-400 font-bold bg-red-200 rounded-sm p-2 border border-red-500">
            Saldo R$: {saldo.toFixed(2)}
          </p>
        )}
      </header>

      {/* FORMULÁRIO DE ENTRADA E SAÍDA */}
      <form className="lg:w-[350px]">
        {/* ENTRADA */}
        <div className="mt-4 lg:mt-8">
          <div className="flex gap-2">
            <label htmlFor="entrada">
              <Input
                ref={inputRef}
                value={saldoCad}
                className="border p-2 rounded-sm"
                type="number"
                name="entrada"
                placeholder="Entrada (R$)"
                onChange={(e) => setSaldoCad(e.target.value)}
              />
            </label>
            <Button
              name="Entrada"
              className="bg-green-400 p-2 font-medium text-white rounded-sm hover:bg-green-300 cursor-pointer"
              onClick={handleCad}
            />
          </div>
          {mensagem && (
            <p className="bg-[#f5f5f5] p-10 rounded-2xl absolute top-34 shadow font-medium">
              {mensagem}
            </p>
          )}
        </div> 

        {/* SAÍDA */}
        <div className="flex gap-2 flex-col mt-6">
          <div className="flex gap-2">
            <label htmlFor="saida">
              <Input
                className="border rounded-sm p-2"
                type="number"
                value={valorSaida}
                name="saida"
                placeholder="Saída (R$)"
                onChange={(e) => setValorSaida(e.target.value)}
              />
            </label>

            {/* SELETOR DE CATEGORIA */}
            <select
              name="categorias"
              className="border rounded-sm p-2"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Categorias</option>
              <option value="fixo">Gastos Fixos</option>
              <option value="investimentos">Investimentos</option>
              <option value="alimentacao">Alimentação</option>
              <option value="farmacia">Farmácia</option>
              <option value="lazer">Lazer</option>
              <option value="extras">Extras</option>
            </select>
          </div>

          {/* DESCRIÇÃO */}
          <textarea
            name="descricao"
            className="border rounded-sm p-2"
            value={descricao}
            placeholder="Ex: 'Luz' "
            onChange={(e) => setDescricao(e.target.value)}
          />

          {/* BOTÃO DE SAÍDA */}
          <Button
            className="bg-red-500 p-2 rounded-sm text-white font-medium mb-4 hover:bg-red-400 cursor-pointer"
            name={"Saída"}
            onClick={handleSaida}
          />
        </div>
      </form>

      {/* EXIBIÇÃO DAS SAÍDAS POR CATEGORIA */}
      <section>
        <h2 className="text-2xl font-semibold">Categorias</h2>
        <hr className="border-gray-300" />
        
        {/* LOOP DAS CATEGORIAS */}
        {['fixo', 'investimentos', 'alimentacao', 'farmacia', 'lazer', 'extras'].map((cat) => (
          <div key={cat} className="border border-[#29282857] rounded-sm p-2 my-4 shadow-xl">
            <h2 className="capitalize font-medium text-[18px]">{cat}</h2>
            <hr className="border-gray-500" />

            {/* FILTRA SAÍDAS DA CATEGORIA */}
            {saidas.filter((saida) => saida.categoria === cat).map((saida) => (
              <div key={saida.id} className="p-2 flex gap-2">
                <p className="text-red-400">R$: -{saida.valor.toFixed(2)}</p>
                <p>Descrição: {saida.descricao}</p>
              </div>
            ))}
          </div>
        ))}
      </section>
    </main>
  );
};

export default Index;
