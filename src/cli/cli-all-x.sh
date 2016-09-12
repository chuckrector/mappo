#!/bin/bash

find $1 -iname $2 -print0 | xargs -0 -I {} node $3 $4 {}
