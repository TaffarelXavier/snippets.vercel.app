help-default help:
	@echo "======================================================================"
	@echo " OPÇÕES DO MAKEFILE"
	@echo "======================================================================"
	@echo "    	 open_vscode: Executa o dump no banco de dados"
	@echo " iniciar_servicos: Executa o restore no banco de dados"
	@echo "  deploy: Executa o restore em um container do docker chamado mysql-server"
	@echo ""

open_vscode:
	#!/bin/bash 
	sudo code . --user-data-dir

start:
	sudo npm run dev

deploy:
	git add .
	git commit -m "Alterações"
	git push origin main
pull:
	git pull origin main