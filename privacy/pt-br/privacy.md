# Política de Privacidade — TCG Companion

**Última atualização:** 25 de agosto de 2026

A Guiomarino Dev & Game ("Guiomarino", "nós" ou "nosso") desenvolve e mantém o **TCG Companion** (o "Aplicativo" ou "App").

Esta Política de Privacidade explica quais informações o Aplicativo processa, onde essas informações são armazenadas, quando são transmitidas a serviços de terceiros e as opções disponíveis para os usuários.

---

## 1. Sobre o TCG Companion

O TCG Companion é um aplicativo desenvolvido para gerenciar, pesquisar e acompanhar coleções de Trading Card Games (TCG). Construído com uma arquitetura modular multi-TCG extensível, o Aplicativo é lançado com suporte inicial abrangente ao Pokémon Trading Card Game.

O Aplicativo foi projetado para operar primordialmente com armazenamento local no dispositivo do usuário. Recursos opcionais, como sincronização em nuvem via Google Drive e exibição de anúncios, envolvem serviços de terceiros.

---

## 2. Informações armazenadas localmente no seu dispositivo

A maioria das informações utilizadas pelo Aplicativo permanece exclusivamente no dispositivo do usuário.

O Aplicativo pode armazenar localmente:
- identificadores de cartas e dados de coleções/expansões;
- variantes de cartas, como Normal, Reverse Holo e Holo;
- quantidades de cartas e contagem de itens adquiridos;
- classificações de estado de conservação/qualidade das cartas;
- itens da lista de desejos e datas de adição;
- preferências visuais e de tema;
- configurações e estado de sincronização;
- carimbo de data/hora da última sincronização;
- um identificador aleatório (GUID) gerado pelo app no dispositivo para resolução de conflitos de sincronização;
- contadores relacionados a anúncios e estado de recompensas locais;
- configurações de cache e atualizações.

O Aplicativo não transmite esses valores armazenados localmente para servidores operados pela Guiomarino Dev & Game.

---

## 3. Sincronização com o Google Drive

O Aplicativo oferece um recurso opcional de sincronização usando o Google Drive.

Quando ativado pelo usuário, o Aplicativo envia os dados necessários para sincronizar a coleção e a lista de desejos para a conta Google do próprio usuário. O Aplicativo solicita apenas o escopo `drive.appdata` do Google Drive, e os dados de sincronização são armazenados na pasta privada `appDataFolder` do Google.

Os dados sincronizados incluem dados da coleção, dados da lista de desejos, metadados de sincronização, o GUID aleatório do dispositivo gerado pelo app, carimbos de data/hora e informações de revisão.

O Aplicativo não utiliza os dados de coleção sincronizados para publicidade, criação de perfis, venda de informações ou finalidades não relacionadas, e não mantém uma cópia própria da coleção do usuário em servidores externos.

Os metadados de sincronização contêm `SchemaVersion`, `DeviceId`, `LastModified` e `Revision`. O `DeviceId` é um GUID aleatório gerado pelo Aplicativo, não sendo um identificador de hardware como IMEI ou número de série. Ele é utilizado unicamente para resolver conflitos entre dispositivos e é incluído no arquivo `sync.json` armazenado na área privada de dados do Google Drive do usuário.

---

## 4. Autenticação do Google

Para habilitar a sincronização com o Google Drive, o Aplicativo utiliza os mecanismos de autorização do Google e solicita apenas o escopo de autorização `drive.appdata`.

O Aplicativo recebe um token de acesso OAuth de curta duração necessário para realizar requisições autorizadas à API do Google Drive. Ele **não** solicita nem recebe o endereço de e-mail do Google, nome, foto de perfil ou ID de conta do usuário.

O token de acesso OAuth é armazenado localmente utilizando os recursos de armazenamento seguro do dispositivo. O Aplicativo não recebe nem armazena a senha da conta Google do usuário.

O TCG Companion não cria nem mantém contas de usuário. A autenticação do Google é utilizada exclusivamente para autorizar o acesso opcional à área de dados do aplicativo no Google Drive para fins de sincronização.

---

## 5. Google AdMob e publicidade

O TCG Companion utiliza o **Google AdMob** para exibir anúncios.

Dependendo da localização, escolhas de consentimento e requisitos aplicáveis, o SDK de publicidade pode processar:
- ID de Publicidade do Google (Advertising ID);
- identificadores e características do dispositivo, como modelo, fabricante, versão do sistema operacional, dimensões de tela e informações da operadora;
- endereço IP;
- localização geográfica aproximada derivada do endereço IP;
- impressões e interações com anúncios, incluindo cliques e visualizações de anúncios premiados;
- diagnósticos técnicos do SDK de anúncios, como latência de requisições, dados de preenchimento e falhas no carregamento de anúncios.

O Aplicativo não solicita a localização precisa do dispositivo e não solicita permissões de GPS.

Anúncios personalizados podem ser exibidos onde permitido e onde o consentimento exigido tiver sido obtido. Anúncios não personalizados podem ser exibidos quando o consentimento para publicidade personalizada não estiver disponível ou for recusado.

O Aplicativo utiliza a Plataforma de Mensagens do Usuário (UMP) da Google para gerenciar o consentimento de publicidade aplicável. Os usuários podem revisar ou alterar suas preferências de privacidade de anúncios em **Configurações → Gerenciar Opções de Privacidade de Anúncios**.

O Aplicativo não vende diretamente as informações pessoais dos usuários a anunciantes. Os dados processados pelo Google AdMob estão sujeitos às práticas de privacidade e retenção de dados da própria Google.

---

## 6. Dados de cartas de serviços externos

Para fornecer catálogos de cartas, imagens e detalhes das cartas, o Aplicativo se comunica com provedores de dados de terceiros, de acordo com o jogo de cartas:

### Módulo Pokémon TCG: TCGdex & PokeAPI
- **TCGdex:** O Aplicativo utiliza a API pública TCGdex para obter informações sobre cartas do Pokémon Trading Card Game, incluindo nomes, descrições, metadados e artes das cartas. As artes e os metadados podem ser armazenados em cache local no dispositivo para otimização de desempenho. O Aplicativo não envia a coleção ou lista de desejos do usuário para o TCGdex. Quando o scanner de cartas reconhece o nome de uma carta, o Aplicativo pode enviar o nome reconhecido como uma consulta de pesquisa de texto ao TCGdex para buscar os detalhes da carta correspondente.
- **PokeAPI:** O Aplicativo utiliza recursos públicos de referência e sprites de Pokémon disponibilizados pelo ecossistema PokeAPI. Os sprites podem ser armazenados em cache local. Nenhum dado de coleção ou informação pessoal do usuário é transmitido ao PokeAPI.

---

## 7. Câmera e escaneamento de cartas

O Aplicativo inclui um recurso de scanner de cartas que utiliza a câmera do dispositivo para auxiliar na identificação de cartas físicas. Os quadros da câmera são processados inteiramente no dispositivo utilizando OpenCV e Tesseract OCR com modelo de idioma incluído localmente no pacote do app.

O Aplicativo não envia fotos da câmera, transmissões de vídeo, recortes de imagens ou texto OCR bruto para a Guiomarino Dev & Game, provedores de dados de cartas (ex.: TCGdex), Google, AdMob ou quaisquer outros serviços remotos.

Após o reconhecimento local ocorrer no próprio dispositivo, o texto com o nome da carta reconhecida pode ser enviado como termo de busca para APIs públicas de cartas (como o TCGdex para Pokémon TCG) para carregar os metadados públicos correspondentes.

---

## 8. Comunicações de rede

O Aplicativo pode se comunicar via HTTPS com:
- **APIs de Dados de Cartas (ex.: TCGdex API & CDN, PokeAPI)** — informações públicas de cartas, ilustrações e sprites;
- **Google Drive API / Google Identity** — sincronização opcional de coleção e autorização;
- **Google AdMob / Google UMP** — exibição de anúncios e gerenciamento de consentimento.

O Aplicativo não opera um servidor backend próprio para receber ou armazenar a coleção do usuário.

---

## 9. Compartilhamento de dados

A Guiomarino Dev & Game não comercializa nem vende informações pessoais dos usuários.

Dependendo dos recursos utilizados, as informações podem ser processadas por:
- **Google:** autenticação e sincronização opcional com Google Drive;
- **Google AdMob:** veiculação de anúncios, métricas de publicidade, prevenção a fraudes e diagnósticos técnicos correlatos;
- **TCGdex & PokeAPI:** metadados públicos de cartas, artes e assets gráficos para o módulo Pokémon TCG.

A coleção do usuário, a lista de desejos e os metadados de sincronização são transmitidos ao Google Drive somente quando a sincronização estiver ativada. O Aplicativo não envia coleções ou listas de desejos para provedores de dados de cartas.

---

## 10. Segurança

Empregamos medidas técnicas razoáveis para proteger as informações processadas pelo Aplicativo, incluindo o armazenamento local dos dados de coleções, armazenamento seguro local de credenciais OAuth, comunicações de rede seguras via HTTPS, mecanismos de autorização da Google e minimização de dados transmitidos para fora do dispositivo.

Nenhum método de transmissão eletrônica ou armazenamento é 100% inviolável.

---

## 11. Retenção e exclusão de dados

### Dados locais
Os dados armazenados localmente permanecem no dispositivo até serem excluídos pelo usuário, pelo Aplicativo ou pelo sistema operacional. Desinstalar o Aplicativo Android remove seu banco de dados local, cache, entradas de armazenamento seguro e preferências do dispositivo.

### Dados do Google Drive
Os dados de sincronização em nuvem permanecem na área de dados de aplicativos do Google Drive do usuário até serem excluídos.

O Aplicativo disponibiliza as opções:
- **Excluir Minha Coleção e Lista de Desejos**;
- **Desconectar Conta Google → Excluir Backup**.

Caso o usuário opte por manter o backup ao desconectar o Google, a cópia em nuvem permanece no Google Drive e apenas as credenciais locais de autenticação são removidas.

Ao desinstalar o Aplicativo, os dados de sincronização em nuvem não podem ser excluídos automaticamente pelo desinstalador, pois o Aplicativo não está mais presente para executar a requisição de exclusão. O usuário pode remover os dados da nuvem reinstalando o Aplicativo e utilizando as opções de exclusão internas ou pelas configurações de gerenciamento de dados de aplicativos do Google Drive.

---

## 12. Seus direitos de privacidade (LGPD e Legislações Aplicáveis)

Em conformidade com a legislação aplicável, incluindo a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) no Brasil e legislações internacionais pertinentes, os usuários têm direitos que incluem: confirmação da existência de tratamento, acesso aos dados, correção de dados incompletos ou inexatos, anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade, portabilidade, informação sobre o compartilhamento de dados, revogação de consentimento e oposição a determinados tratamentos.

Para solicitações referentes ao processamento realizado pela Guiomarino Dev & Game, entre em contato através dos dados abaixo. Quando as informações forem processadas diretamente por terceiros (como Google AdMob ou Google Drive), as solicitações deverão ser direcionadas a esses provedores.

---

## 13. Serviços de terceiros e políticas

O Aplicativo utiliza Google / Google Identity / Google Drive, Google AdMob / Google User Messaging Platform, TCGdex e PokeAPI. Recomendamos que os usuários consultem as políticas de privacidade desses provedores:
- [Política de Privacidade do Google](https://policies.google.com/privacy)
- [Termos de Serviço do Google Drive](https://www.google.com/drive/terms-of-service/)
- [TCGdex](https://tcgdex.net/)
- [PokeAPI](https://pokeapi.co/)

---

## 14. Privacidade de crianças

O TCG Companion não foi concebido para solicitar ou coletar intencionalmente dados pessoais de crianças para criação de perfis. O Aplicativo não requer nome, e-mail ou dados de perfil infantil.

Se os pais ou responsáveis legais acreditarem que uma criança forneceu informações pessoais indevidamente, pedimos que entrem em contato conosco pelos canais indicados abaixo.

---

## 15. Alterações nesta Política de Privacidade

Podemos atualizar esta Política de Privacidade quando o Aplicativo, seus jogos de cartas suportados, integrações de terceiros ou requisitos legais mudarem. Ao realizarmos alterações, atualizaremos a data de "Última atualização" no início deste documento.

---

## 16. Contato

**Guiomarino Dev & Game**  
**Aplicativo:** TCG Companion  
**E-mail:** `guiomarinodev@gmail.com`  
**Website:** [https://guiomarinodev.github.io](https://guiomarinodev.github.io)  
**URL da Política de Privacidade:** [https://guiomarinodev.github.io/privacy/pt-br/](https://guiomarinodev.github.io/privacy/pt-br/)
