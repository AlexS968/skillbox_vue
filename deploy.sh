#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка приложения
npm run build

# переход в каталог сборки
cd dist

# инициализация репозитория
git init

# добавление файлов для коммита
git add -A

# коммит
git commit -m 'deploy'

# отправка в репозиторий на GitHub
git push -f https://github.com/AlexS968/vue-app.git master:gh-pages

# возвращаемся в корневую папку проекта
cd ..