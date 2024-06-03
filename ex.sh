#!/usr/bin/env bash

if [ -f .env ]; then
  export $(cat .env | xargs)
fi

case "$1" in
db:connect)
  psql ${DATABASE_URL}
  ;;
*)
  echo $"Usage: $0 db:connect"
  exit 1
  ;;
esac
