import React, { useState, useEffect } from 'react'

const NameComponent = () => {
  const [mostrarPainelReadme, setMostrarPainelReadme] = useState(false)
  const removePainelReadme = () => {
    setMostrarPainelReadme(false)
    localStorage.setItem('esconder.painel.readme', true)
  }

  useEffect(() => {
    if (localStorage.getItem('esconder.painel.readme')) {
    } else {
      setMostrarPainelReadme(true)
    }
  }, [])

  return (
    <>
      {mostrarPainelReadme && (
        <section
          id="secao-infomativa-sistema"
          role="alert"
          style={{ /* maxWidth: 768 */ marginBottom: 40 }}
        >
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
            id="fechar-painel-informativo"
            onClick={removePainelReadme}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <h1 style={{ marginBottom: 35, fontSize: '40px' }}>
            <strong>Snippets</strong> são pequenos <strong>trechos</strong> de
            códigos que ajudam na produtividade.
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              style={{ minHeight: 400 }}
              src="/assets/images/operating system-amico.svg"
              alt="operating system-amico.svg"
            />
          </div>
          <p>
            No mundo do <b>desenvolvimento de sistemas</b>, esse termo é usado
            para designar pequenos <strong>trechos de códigos</strong>, usados
            com frequência, que ajudam no desenvolvimento de seu sistema. Se
            você estiver executando o mesmo código, repetidamente, considere
            sempre entrar nesta página à medida que precisar de um código
            rápido.
          </p>
          Minha opinião:
          <p>
            Caro programador, sinceramente, é verdade que nem sempre
            armazenaremos tudo em nossa mente; eu, particularmente, às vezes,
            passo algum tempo de minha vida pesquisando alguma coisa, que, pelo
            incrível que pareça, eu já tinha feito antes durante o
            desenvolvimento de algum sistema.
          </p>
          <p>
            Portanto, quero lhe fazer um pergunta para finalizar: Você lembra da
            API de conversão de datas, IO, e outras mais, ao ponto de realizar
            uma prova, em um notepad++, tendo que realizar métodos que realizem
            alguma funcionalidade que exija conhecimento da API,{' '}
            <strong>SEM ACESSO À PESQUISA?</strong>
            <br />
            Sim?<span style={{ fontSize: '1.3rem' }}>😕</span>
            Você não precisará deste site.
            <br />
            <strong>
              Não? Ótimo! ❤️ Você poderá recorrer sempre a este site para
              qualquer pesquisa na área de programação.
            </strong>
          </p>{' '}
          <br />
          <h3>
            <span>Guia rápido: Anatomia dos Snippets</span>
          </h3>
          <br />
          <img
            src="/assets/images/card-anatomy.png"
            alt="card-anatomy"
            style={{ border: '1px solid #ccc' }}
          />
          <br />
        </section>
      )}
    </>
  )
}
export default NameComponent
