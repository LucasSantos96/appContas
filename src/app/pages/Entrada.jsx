"use client";

import React, { useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

const Index = () => {
  //começo da lógica de entrada de valores
  const inputRef = useRef("");
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const [saldoCad, setSaldoCad] = useState("");
  const [saldo, setSaldo] = useState(0);
  const [mensagem, setMensagem] = useState("");

  const handleCad = (e) => {
    e.preventDefault();
    const numero = parseFloat(saldoCad);

    if (!numero) {
      setMensagem("❌ Digite um valor para cadastrar! ❌");
      return;
    } else {
      setMensagem("");
    }

    setSaldo((prevTotal) => parseFloat(prevTotal + numero));
    setSaldoCad("");
  };
  // fim da lógica de valores de entrada
  //----

  //Começo lógica de saídas
  const [valorSaida, setValorSaida] = useState('')
  const [saidas, setSaidas] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleSaida = (e) => {
    e.preventDefault()

    const numero = saldo

    const novaSaida = {
      id: Date.now(),
      valor: parseFloat(valorSaida),
      categoria,
      descricao,
    }
     setSaidas(prev => [...prev, novaSaida])


     //subtrai do valor total do saldo
     setSaldo( numero - valorSaida)
    
    setDescricao('')
    setValorSaida('')
  };

  return (
    <main className="mx-4 flex flex-col gap-4">
      <form>
        {/*Seção entrada de valores */}
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">AppGastos</h1>
          {saldo > 0 ? (
            <p className="text-green-400 font-bold">
              Saldo R$: {saldo.toFixed(2)}
            </p>
          ) : (
            <p className="text-red-400 font-bold">
              Saldo R$: {saldo.toFixed(2)}
            </p>
          )}
        </div>
        <div className="mt-4">
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
              className="bg-green-400 p-2 font-medium text-white rounded-sm "
              onClick={handleCad}
            />
          </div>
          {mensagem && (
            <p className=" bg-[#f5f5f5] p-10 rounded-2xl absolute top-34 shadow  font-medium ">
              {mensagem}
            </p>
          )}
        </div> 
       
        {/*Seção Saídas */}
        <div className="flex  gap-2 flex-col mt-6">

          <div className="flex gap-2">
            <label htmlFor="saida">
              <Input
                className="border rounded-sm p-2 "
                type="number"
                value={valorSaida}
                name="saida"
                placeholder="Saída (R$) "
                onChange={(e) => setValorSaida(e.target.value)}
              />
            </label>

            <select
              name="categorias"
              className="border rounded-sm p-2 "
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

          <textarea
            name="descricao"
            className="border rounded-sm p-2 "
            value={descricao}
            placeholder="Ex: 'Luz' "
            onChange={(e) => setDescricao(e.target.value)}
          />

          <Button
            className="bg-red-500 p-2 rounded-sm text-white font-medium mb-4"
            name={"Saída"}
            onClick={handleSaida}
          />
        </div>
      </form>

      <section className="">
        <h2 className="text-2xl font-semibold">Categorias</h2>
        <hr  className="border-gray-300"/>
      
          {['fixo', 'investimentos', 'alimentacao', 'farmacia', 'lazer', 'extras'].map((cat)=> (
            <div key={cat} className="border border-[#29282857] rounded-sm p-2 my-4 shadow shadow-2xl">
              <h2 className="capitalize font-medium text-[20px]">{cat}</h2>
              <hr className="border-gray-500"/>
              {saidas.filter((saida) => saida.categoria === cat)
              .map((saida) => (
                <div key={saida.id} className=" p-2 flex gap-2">
                  <p className="text-red-400">R$: -{saida.valor.toFixed(2)}</p>
                  <p>Descrição: {saida.descricao}</p>
                  <hr className="border-gray-300"/>
                  </div>
              ))}
            </div>
          ))}
       
    

        
      </section>
    </main>
  );
};

export default Index;
