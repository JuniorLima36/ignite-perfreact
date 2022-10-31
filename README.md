# Renderização

## Quando um componente renderiza

- Quando o componente pai renderiza
- Quando um hook atualiza alguma info (useState, useContext, useReducer)
- Quando uma prop atualiza

## Etapas

- Cria uma nova versão do componente
- Compara a nova versão com a versão antiga
- Caso tenha mudanças, atualiza onde mudou (utilizando a sintaxe de reconciliation)

## Memo

O React.memo faz com que o render não crie a nova versão do componente caso as props estejam iguais as anteriores.
Por padrão, o React.memo faz um shallow compare (===), o que faz com que a comparação entre objetos sempre retorne false, pois {} não é igual a {} (as referencias não são iguais). Por isso, o React.memo aceita um segundo parâmetro que é uma função que indica se as props são iguais ou não.

```jsx
React.memo(Component, (prevProps, nextProps) => {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
});
```

### Quando usar o memo

- Pure Functional Components

  Pure functions são funções que dados os mesmos parâmetros retornam o mesmo resultado. Ex.: se a função retorna um 'há x horas', essa info muda de acordo com a data/horário em que ela é chamada, portanto, não é uma pure function.

- Components that render too often

  Componentes que renderizam de mais. É possível observar isso com o Profiler do React Dev Tools.

- Re-renders with same props

  Quando o componente renderiza muitas vezes com as mesmas props, é interessante usar o memo.
  É importante lembrar que por mais que os processos do render nao aconteça, a comparação do memo é executada no lugar do render, então em casos que o componente é renderizado muitas vezes, mas com props diferentes, é melhor deixar o render acontecer.

- Medium to Big size

  Dependendo da complexidade do componente, em componentes muito pequenos por exemplo, pode ser que o custo para fazer a comparação do React.memo seja bem parecido com o custo do render gerar uma nova versão do componente e comparar com a antiga, portanto, é melhor deixar o render fazer o trabalho.

## useMemo

- Calculos pesados

  Usado para evitar que algo que use muito processamento seja executado toda vez que o componente renderizar.
  O useMemo possui um custo para fazer a comparação do array de dependencias, portanto, em casos em que o calculo a ser fazer é simples, vale mais a pena não utiliza-lo.

- Igualdade referencial (quando repassamos aquela info para um componente filho)

  Pode ser utilizado para evitar que uma variavel ocupe um novo local na memória quando ela foi criada para ser passada para um componente filho.
  Se o calculo nao é pesado, mas mesmo assim a info é repassada para os componentes filho, vale a pena usar o `useMemo`, pois evita que a info seja criada do zero e que o algoritimo de reconciliação acuse que as variáveis são diferentes e atualize desnecessáriamente.

### useCallback

O `useCallback` é parecido com o `useMemo`, mas ele é utilizado quando queremos memorizar uma função e não o seu resultado.
Sempre que um componente renderiza, todas as funcs dentro dele são recriadas, ou seja, elas ocupam um novo espaço na memória, portanto, se algum componente filho recebe uma func do componente pai nas props, quando o componente pai renderizar, a func vai ser recriada e o React entenderá que a prop que recebe a func foi atualizada, fazendo com que o componente filho seja renderizado novamente por essa mudança. O `useCallback` serve para resolver essa igualdade referencial da função.

- Quando criamos uma função que será repassada para os componentes filhos, é importante utilizar o `useCallback` (isso também vale para funções de contextos).

### Calculos e Formatações

Não devemos fazer calculos/formatações de retornos de APIs por exemplo dentro da re-render dos componentes, pois sempre que o componente renderizar, esse calculo será refeito, ou caso esteja utilizando `useMemo`, a comparação será feita. Como em teoria esses calculos/formatações só deverão rodar quando a API retornar algum valor, é interessante colocar calculos/formatações abaixo da chamada a API, assim, não é necessário fazer verifições de dependencias.

### Code Splitting

Importar algo somente no momento em que for utilizar para reduzir o bundle inicial.

### Virtualização

Quando uma tela possui uma lista por exemplo de muitos itens, acaba sendo um pouco pesado exibir tudo isso, e as vezes, o usuário nem irá ver todo esse conteúdo gerado. Para contornar isso, podemos fazer com que a lista só carregue os itens quando o usuário dê scroll. Para isso utilizamos a virtualização.
Um exemplo de lib é a react-virtualized.

### Bundle analyzer

É usado para ver qual o tamanho do bundle e o quanto cada lib está ocupando.