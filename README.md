# Desafio Fullstack

Blog com sistema CRUD, composto por Django Framework no backend e VueJS no Frontend.  

O Blog possui um sistema de curtidas de cada post e criação/modificação/deleção de posts, sendo as duas funcionalidades feitas sem que haja atualização das páginas do sistema, por meio de chamadas assíncronas ao backend.  

![](demo.mp4)

## Front end
Interface construída com [Vue.js](https://vuejs.org/) para componentização e [BootstrapVue 3](https://cdmoro.github.io/bootstrap-vue-3/) para estilização.  
Embora BootstrapVue 3 ainda esteja em desenvolvimento não foram encontrados muitos problemas com o seu uso.


## Back end
Micro serviços construidos com [Django](https://www.djangoproject.com/) e [Django Rest Framework](https://www.django-rest-framework.org/).  
Foram utilizados adicionalmente [Django Rest Framework JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/) para fácil criação de jwt-tokens e [Corsheaders](https://pypi.org/project/django-cors-headers/) para permitir a comunicação do backend com o frontend em diferentes contextos de execução.


## Execução
É necessário ter [Python 3](https://www.python.org/downloads/) e [Node.js](https://nodejs.org/en/) instalados e a partir do diretório raiz do projeto executar em terminais separados:  

### Back end
    # Instalar as dependências 
    pip install < backend/requirements.txt

    # E rodar o servidor
    python3 backend/manage.py runserver

### Front end
    # Instalar as dependências
    npm --prefix frontend/ i

    # E rodar o servidor
    npm --prefix frontend/ run dev
