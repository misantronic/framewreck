#!/bin/bash
MODULES=../js/modules

uglifyjs -o ${MODULES}/ajax/fw.ajax.min.js ${MODULES}/ajax/fw.ajax.js
uglifyjs -o ${MODULES}/css/fw.css.min.js ${MODULES}/css/fw.css.js
uglifyjs -o ${MODULES}/data/fw.data.min.js ${MODULES}/data/fw.data.js
uglifyjs -o ${MODULES}/dom/fw.dom.min.js ${MODULES}/dom/fw.dom.js
uglifyjs -o ${MODULES}/events/fw.events.min.js ${MODULES}/events/fw.events.js