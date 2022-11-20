---
title: GIT
---

# {% $markdoc.frontmatter.title %}


## ¡La he cagado en un commit! ¿Como vuelvo atrás sin perder los cambios?

Es posible que hayas metido la pata una vez hecho el commit. Igual te has equivocado en el mensaje o en los archivos incluidos. Así es como se vuelve atrás sin perder los cambios y manteniendo el mensaje que se puso inicialmente.

```
$ git commit -m "Something terribly misguided"             # (1)
$ git reset HEAD~                                          # (2)
<< edit files as necessary >>                              # (3)
$ git add ...                                              # (4)
$ git commit -c ORIG_HEAD                                  # (5)
```

https://stackoverflow.com/a/927386/504910

## Para activar el autocompletion en git

https://github.com/bobthecow/git-flow-completion/wiki/Install-Bash-git-completion#os-x--macos

### Homebrew

1. [Install homebrew](https://brew.sh)

2. Install Git and bash-completion: `brew install git bash-completion` (Note: If this install fails with a 404 error, and you already have git installed, just remove the git part of this brew install)

3. Add bash-completion to your `~/.bash_profile`:

    ```
    [ -f /usr/local/etc/bash_completion ] && . /usr/local/etc/bash_completion
    ```

## Mi rama master no me muestra el mensaje Your branch is ahead of origin/master by X commits o Your branch is up to date with origin/master

Esto es porque al hacer el push inicial no lo hemos hecho con la opción -u. Hay que enlazar la rama local con la remota

```git branch --set-upstream-to=origin/master master```

O directamente hacer un:  

```git push -u origin/master```

## Borrar ramas locales y remotas

Borrar rama local
```$ git branch -d nombre-rama```

Borrar rama remota
```$ git push --delete origin nombre-rama```

Para que al hacer un ```$ git branch -a``` no aparezcan las ramas del servidor que ya han sido borradas habrá que hacer:  
```$ git fetch --all --prune ```


## Operativa GIT

- Creación de rama
``` $ git checkout dev```
``` $ git checkout -b nombre-rama-hija```

- Commit
``` $ git add .```
``` $ git commit -m "Mensaje del commit"```

- Actualización de repositorio (Hacer a menudo)
``` $ git fetch origin``` (coge todos los cambios de bitbucket)  
``` $ git checkout master``` (me posiciono en la rama master)
``` $ git rebase origin/master``` (actualizo mi copia local de master)
``` $ git checkout nombre-rama-hija``` (vuelvo a la rama hija)
``` $ git rebase master``` (actualizo la rama hija con los commits de master y por detrás los commits de la rama hija)

Cuando hayamos terminado incorporamos nuestra rama a master
``` $ git checkout master```
``` $ git rebase nombre-rama-hija```
``` $ git push origin master```

## Problema al hacer rebase

Si al hacer un rebase de dev en una rama feature nos dice el siguiente error:

Your branch and 'origin/feature/nombre-feature' have diverged,
and have 17 and 8 different commits each, respectively.
  (use "git pull" to merge the remote branch into yours)

**Atención nunca hacer un pull, ya que al tener las ramas diverged, los commits se duplicarían**

Habría que revisar que la rama que tenemos local tiene los commits que tenemos en origin y hacer un push --force-with-lease

```git push --force-with-lease```

de esta forma subiremos los commits locales haciendo que nuestra rama no esté diverged y estén las dos (local y origin) en el mismo punto de desarrollo.


+ info  
https://stackoverflow.com/questions/66231722/your-branch-and-origin-integration-phone-number-change-have-diverged
