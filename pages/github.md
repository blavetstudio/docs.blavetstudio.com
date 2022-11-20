---
title: Github
---

# {% $markdoc.frontmatter.title %}

## ACT 

Utilizamos ACT para probar los Github Actions antes de subirlos al repo y no gastar minutos de compilación

https://github.com/nektos/act

Ejemplos:

```$ act -j deploy -s AWS_ACCESS_KEY_ID=XXXXXXXXXX -s AWS_SECRET_ACCESS_KEY=XXXXXXXXXX```

```$ act push -s AWS_ACCESS_KEY_ID=XXXXXXXXXX -s AWS_SECRET_ACCESS_KEY=XXXXXXXXXX```