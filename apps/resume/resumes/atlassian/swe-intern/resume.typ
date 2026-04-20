#import "../../../cv.typ": *

#let cvdata = yaml("data.yml")
#let uservars = (
  headingfont: "Linux Libertine",
  bodyfont: "Linux Libertine",
  fontsize: 10pt,
  linespacing: 6pt,
  sectionspacing: 0pt,
  showAddress: true,
  showNumber: true,
  showTitle: true,
  headingsmallcaps: false,
  sendnote: false,
)

#let customrules(doc) = {
  set page(
    paper: "us-letter",
    numbering: "1 / 1",
    number-align: center,
    margin: 1.25cm,
  )
  doc
}

#let cvinit(doc) = {
  doc = setrules(uservars, doc)
  doc = showrules(uservars, doc)
  doc = customrules(doc)
  doc
}

#show: doc => cvinit(doc)
#cvheading(cvdata, uservars)
#cvwork(cvdata)
#cveducation(cvdata)
#cvprojects(cvdata)
#cvawards(cvdata)
#cvaffiliations(cvdata)
#cvcertificates(cvdata)
#cvpublications(cvdata)
#cvskills(cvdata)
#cvreferences(cvdata)
#endnote(uservars)
