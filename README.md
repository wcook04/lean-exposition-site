# Why the SK order parameter has no gaps

This repository holds the built reading website published at
https://wcook04.github.io/lean-exposition-site/.

The website presents one theorem about the zero-temperature
Sherrington–Kirkpatrick spin glass: every minimising Parisi order parameter
increases across every interval in [0, 1). It has three written accounts of
the proof (an exposition, a short paper and a long record), each readable on
the site or as a PDF in `pdf/`, an argument map of the records the proof
uses, and the checks recorded for them. The architectural companion explains
why these accounts share one record; read it on the About page or in
`pdf/architecture.pdf`.

The mathematics comes from OpenAI's mathematics release, family 281:
https://github.com/openai/math/blob/adc7f1241b42e322a6451854ab7e4b4c146bf78a/lean/docs/281.md

Plectis Atlas has a page for the same family:
https://wcook04.github.io/plectis-atlas/families/281.html

Will Cook made this website as part of Plectis, his projects on researching
mathematics with AI and on tools that help people follow what AI produces:
https://wcook04.github.io/plectis/
His videos are on YouTube: https://www.youtube.com/@willcook2004

Source, papers, tools and contribution instructions:
https://github.com/wcook04/lean-exposition

This repository receives the generated website from the source repository’s
main-branch build workflow. Make changes in the source repository; the workflow
publishes the resulting files here.
