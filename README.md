# Password-api
> Uma simples api de geração de senhas

# Como usar?
Enviando um método `GET` para o endpoint `https://password-api.azurewebsites.net/generate` você receberá como resposta um json contendo a senha gerada e algumas informações sobre a senha.

## Parâmetros
- `min` e `max`: Com esses parâmetros você pode definir o intervalo do tamanho randômico. Ex. `/generate?min=10&max=20` a API irá retornar uma senha aleatória com o tamanho entre 10 e 20 caracteres.
- `pattern`: Com esse parâmetro você consegue definir uma forma de como deseja que seja formada a senha. As opções permitidas são: `L` = Letra (`l` para minúsculo e `L` para maiúsculo ), `N` = Numero, `A` para Letra (indiferente para maiúsculo ou minúsculo) e `S` = Caractere Especial. Ex. `/generate?pattern=LANNSS` irá gerar uma senha `Lo77:#`
    > ATENÇÃO, quando é definido uma pattern, o tamanho da senha fica fixo seguindo a pattern definida.
- `prefix`: Adiciona um prefixo na senha. Ex. `/generate?prefix=twitch&pattern=LLLL` irá retornar uma senha como: `twitchCPYM`
- `suffix`: Adiciona um sufixo na senha. Ex. `/generate?suffix=youtube&pattern=NNN` irá retornar uma senha como: `405youtube`
- `uppper`: Configura se as letras serão maiúsculas
- `down`: Configura se as letras serão minúsculas 
    > Por padrão os valores de `Upper` e `Down` são definidos para 0, caso os dois seram definidos para 1 será defindo como aleatório.
## Password info
Retorna o que foi utilizado na formação da senha.
- `lenght`: Tamanho da senha
- `pattern`: Infomra a pattern usada, caso não usada fica como `false`
- `prefix`: Informa qual foi o prefixo usado, caso não usado ele fica como `false`
- `suffix`: Informa qual foi o sufixo usado, caso não usado ele fica como `false`

> Ex. `{"lenght":10,"pattern":"NNN","prefix":false,"suffix":"youtube"}`

# Rodando localmente
Para rodar a API localmente, 
- 1º Clone o repositório e entre na pasta do projeto,
- 2º Use o comando `npm install` para instalar as dependências,
- 3º Use o comando `npm start` para rodar a api localmente

## Colocando em produção LOCAL
Para colocar a API em produção local, configure um arquivo systemd para rodar o comando `node ./bin/www` dentro da pasta do projeto.