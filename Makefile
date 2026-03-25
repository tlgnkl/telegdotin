.PHONY: dev build preview check clean

dev: ## Запустить dev-сервер
	npx vite --port 5173

build: ## Собрать production + пререндер
	npx tsc -b && npx vite build && node scripts/prerender.mjs

preview: ## Превью production-сборки
	npx vite preview

check: ## Проверить типы
	npx tsc -b

clean: ## Очистить dist
	rm -rf dist

help: ## Показать команды
	@grep -E '^[a-z]+:.*##' Makefile | awk -F ':.*## ' '{printf "  make %-10s %s\n", $$1, $$2}'
