#!/bin/sh
cd ../src && for f in $(find * -name *.scss -or -name *.css); do cp $f --parent ../dist; done