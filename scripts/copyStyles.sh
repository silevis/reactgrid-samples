cd src && find . -type f \( -iname \*.css -o -iname \*.scss \) -exec cp --parents "{}" ../dist \;