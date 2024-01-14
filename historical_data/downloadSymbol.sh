#!/bin/bash
SYMBOL="$1"

jdata stock -s $SYMBOL -f 2018-01-01 -t 2023-12-31 -o ./historical_data/symbols/$SYMBOL.csv

echo "Success"