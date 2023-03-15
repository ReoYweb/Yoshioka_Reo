#!/bin/sh

cd $(dirname $0)
#sass --watch -t nested scss:css
#sass --watch -t expented scss:css
sass --watch -t compact scss:css
#sass --watch -t compressed scss:css