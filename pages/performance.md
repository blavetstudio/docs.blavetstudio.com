---
title: Rendimiento
---

# {% $markdoc.frontmatter.title %}

```
SELECT table_name,
  Round(data_length / 1024 / 1024) AS data_length_mb,
  Round(data_free / 1024 / 1024) AS data_free_mb
FROM information_schema.tables
WHERE engine = 'InnoDB'
ORDER BY 3 DESC;
```