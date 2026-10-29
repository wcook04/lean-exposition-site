import{D as e,N as t,d as n,f as r,h as i,l as a,o,t as s,x as c}from"./documents-BUyRzayI.js";import{Ct as l,N as u,ft as d,mt as f,pt as p,xt as m}from"./index-Csj-yQm0.js";import{t as h}from"./_virtual_paper-pdfs-7cx7OmnJ.js";import{a as g,i as _,n as v,r as y,t as b}from"./Out-DMndBdtY.js";var x=t(),S=`---
title: "One argument, several ways to read it"
subtitle: "An architectural companion to Lean Exposition"
date: "26 October 2026"
portable-local-links: true
header-includes:
  - |
    \\usepackage{tikz}
    \\usepackage{float}
    \\usetikzlibrary{arrows.meta,positioning,fit}
    \\tikzset{archbox/.style={draw=black!45,fill=white,inner sep=7pt,align=center,font=\\small},
      archrecord/.style={archbox,draw=blue!60,fill=blue!3},
      archview/.style={archbox,dashed},
      archflow/.style={-{Stealth[length=2mm]},draw=black!65,rounded corners=3pt},
      archreading/.style={archflow,dashed},
      archfield/.style={archflow,densely dotted},
      archnote/.style={font=\\small,align=center,inner sep=2pt,fill=white}}
---

A mathematician reading a short proof may want to stop at its main idea, check
one difficult estimate, or learn the subject from the beginning. Those are
different requests. A proof assistant can check a precisely stated theorem,
but its successful check does not choose an explanation for any of these
readers. Nor does a readable explanation, by itself, show how faithfully it
represents the checked statement.

Lean Exposition connects three written accounts of selected mathematics to a
shared record of claims, assumptions, sources and checks. Each account has its
own purpose and reading order. Their connections let a reader leave an
explanation at the point of doubt, recover the relevant detail, and return
without losing track of which statement was being discussed. This companion
explains that arrangement and the choices behind it. The mathematical papers
supply the arguments themselves. The repository implements the records and
reading tools described here; the worked journeys show what they preserve
and what a reader or author still has to decide.

## 1. Why write more than one account?

The starting material may include an original research paper, a formal
development in the Lean proof assistant, and earlier literature. These sources
answer different questions.
The research paper explains a mathematical argument in the author's chosen
language. The Lean development gives precise definitions and formal proofs.
Earlier literature establishes what was known, where an input came from and
which conclusions require additional results. Reading one does not necessarily
recover the content of the others.

An author first reconstructs the selected argument in a **long reasoning
record**. This is where a reader should be able to find the derivation behind
an estimate, the treatment of an endpoint, or the reason two formulations
correspond. Its length follows the argument that needs recovering. It can
retain a failed approach when the failure explains why a hypothesis matters.
It also identifies steps that have not been justified.

A **short research paper** then selects a contribution worth presenting as a
connected argument. It gives the statement, its position in the literature
and the decisive proof, with precise destinations for substantial details it
omits. The selection may leave whole further results in the long record.
Those omissions should make the paper more focused without making its claims
stronger.

An **expository paper** makes a different selection. It teaches a result to
readers with stated prerequisites, introducing objects through examples and
explaining why each construction is needed. It may spend more time on a
definition than the specialist paper, while covering fewer consequences.
Its author keeps the original sources and detailed record available; the
exposition need not be produced by repeatedly shortening the short paper.

The supplied example concerns the Sherrington–Kirkpatrick (SK) model, a random
optimisation problem on interacting spins. Its exposition begins with a
two-spin calculation and explains why an optimal function used to express the
model's value cannot stay flat on an interval. The short paper uses one
quantitative estimate twice: first to exclude these gaps, then in a further
argument for positive density. The exposition teaches the contact argument
by scaling weights introduced in an earlier example; the specialist account
uses local removal of mass. The long record retains both proofs, reconstructs
the analytic estimates and continues into the separate argument about the
Quantum Approximate Optimization Algorithm (QAOA). A reader interested in
the no-gap mechanism does not have to read the circuit construction first.

These are entrances for different purposes. The writing process gives authors
more context than any one reader is asked to absorb.

## 2. What the shared graph remembers

Maintaining three accounts creates a practical problem. If a hypothesis is
corrected in the detailed argument, which shorter passages need attention?
If a reader doubts an estimate, where is it explained, and which source is
being invoked? A bibliography alone cannot answer these questions at the
level of a particular passage.

The project records selected claims and their relationships in a graph. A
claim has a stated scope and associated assumptions. It can point to an
ingredient used in its argument, an original source, or a formal statement
with which the author proposes a correspondence. Sources retain their editions;
checking records say what was checked and with what outcome. This is a curated,
partial account of the available mathematics. It does not pretend to contain
every declaration or every dependency in the underlying Lean development.

Each written paper has a **passage map**: annotations connecting selected
passages to the claims, assumptions and citations they discuss. Thus two
papers can refer to the same claim while explaining it differently. Their
prose remains independently readable, and text without a recorded mapping
remains visible as such.

\\begin{figure}[H]
\\centering
\\begin{tikzpicture}
\\node[archview,text width=3.6cm,minimum height=1.8cm] (long) at (-4.7,0)
  {\\textbf{Long record, \\S5}\\\\The separate gap cases};
\\node[archview,text width=3.6cm,minimum height=1.8cm] (short) at (0,0)
  {\\textbf{Short paper, \\S1}\\\\Theorem 1 and its scope};
\\node[archview,text width=3.6cm,minimum height=1.8cm] (expo) at (4.7,0)
  {\\textbf{Exposition, \\S4}\\\\The prepared theorem};
\\node[archrecord,text width=13.1cm,minimum height=1.6cm] (corpus) at (0,-3.4)
  {\\textbf{One selected claim in the shared record}\\\\No gaps for an admissible SK minimiser};
\\draw[archflow] (long.south)--node[archnote,text width=3.5cm]{maps this passage\\\\to the claim}(-4.7,-2.6);
\\draw[archflow] (short.south)--node[archnote,text width=3.5cm]{maps this passage\\\\to the claim}(0,-2.6);
\\draw[archflow] (expo.south)--node[archnote,text width=3.5cm]{maps this passage\\\\to the claim}(4.7,-2.6);
\\end{tikzpicture}
\\caption{Three passages, one recorded claim. These passages directly name the same ordinary no-gap claim, whose hypotheses remain fixed. Their wording, proof choices and reading order can differ. The arrows denote authored passage mappings; they do not assert equivalent passages or automatic generation. Only one of the shared corpus's claims is shown.}
\\label{fig:shared-claim}
\\end{figure}

An arrow needs a meaning. Here an argument arrow points from a claim to an
ingredient it uses: following it asks what supports the claim. Following the
same relation backwards asks what recorded arguments use that ingredient.
The direction of the stored relationship stays the same. Several ingredients
may be needed together; an arrow to one of them does not say that it alone
proves the conclusion.

Other relationships answer other questions. A citation credits or refers to
a source. A correspondence with a formal statement asks the reader to compare
two formulations. A recorded Lean dependency says that a constant occurs in
a declaration's formal type or proof, or in its structural references. A
checking record identifies the source or claim it concerns. These relations
must remain distinguishable: a source can be historically relevant without
being a premise, and a proposed correspondence can require a mathematical
argument of its own.

The order of paragraphs is another relationship again. An exposition may
give an example before stating the general theorem; a specialist paper may
state the theorem first. Neither order changes the theorem's prerequisites.
A paper's reading route therefore consists of its authored sequence together
with the support selected for its passages. The graph helps readers inspect
that selection; it does not choose a sufficient proof or a good teaching order.

Local queries can also start from a source and find its recorded uses, or
follow a claim back to its ingredients. They report when a paper restriction,
exploration depth or result limit stops the search. The corpus is partial:
an absent path is not a conclusion of mathematical independence. These
boundaries matter when the same traversal is used to plan a correction.

## 3. Follow one claim back to its argument

The SK model asks which choices of signs maximise a random sum of pair
interactions. The Parisi formula expresses its limiting optimum through a
minimisation over functions called order parameters. In the pure model at
zero external field, an admissible order parameter is a nonnegative,
nondecreasing, right-continuous, integrable function
$\\gamma:[0,1)\\to[0,\\infty)$. Its associated measure records the increments
of $\\gamma$. A flat interval is a gap in those increments, even if the
function's value there is positive.

The result at issue says that an admissible minimiser has no such gap: its
measure has full support relative to $[0,1)$. The endpoint one is excluded.
Existence of a minimiser comes from a separate theorem of
[Auffinger and Chen](https://arxiv.org/abs/1606.05335v2).
An earlier [paper by Hong-Bin Chen](https://arxiv.org/abs/2607.18032v1)
established full support by another method. The worked accounts reconstruct the
quantitative argument in [OpenAI's full-support manuscript](https://github.com/openai/math/blob/adc7f1241b42e322a6451854ab7e4b4c146bf78a/preprints/Full-support-of-the-zero-temperature-Sherrington-Kirkpatrick-order-parameter-September-27-2026/build/main.tex).
Their contribution here is the explanation and its correspondence to sources.

Consider just one case: a bounded gap $(\\ell,r)$ between support points,
with $0<\\ell<r<1$, on which $\\gamma$ has a positive constant value.
To test whether $\\gamma$ could minimise, the proof constructs a differentiable
curve $q$ measuring the average squared response in an auxiliary optimisation
problem. The mathematical papers explain that construction. Here we take two
properties as inputs and follow how they exclude the gap.

Minimality gives **contact** at the endpoints. In the notation of the papers,
this supplies
$$
q(\\ell)=\\ell,\\qquad q(r)=r,\\qquad q'(\\ell),q'(r)\\leq1.
$$
The change in $q$ across the interval must therefore be $r-\\ell$.
Separately, a strict-curvature estimate on a positive constant interval
makes $q'$ strictly convex. Since $q'$ is continuous at the endpoints, its
interior values lie strictly below their joining chord, which is at most one.
Consequently
$$
q(r)-q(\\ell)=\\int_\\ell^r q'(t)\\,dt<r-\\ell.
$$
The two requirements contradict each other. Neither endpoint contact nor
strict curvature alone gives this contradiction.

\\begin{figure}[H]
\\centering
\\begin{tikzpicture}
\\node[archrecord,text width=11.7cm,minimum height=1.3cm] (gap) at (0,0)
  {\\textbf{A bounded positive gap is impossible}\\\\The required change in $q$ is $r-\\ell$; the integral of $q'$ is smaller.};
\\node[archnote,text width=11.7cm] (joint) at (0,-1.25)
  {\\textbf{Both inputs concern the same $q$ on $[\\ell,r]$.}};
\\node[archbox,text width=5.25cm,minimum height=1.8cm] (contact) at (-3.55,-3.0)
  {\\textbf{Endpoint contact}\\\\$q(r)-q(\\ell)=r-\\ell$\\\\$q'(\\ell),q'(r)\\leq1$};
\\node[archbox,text width=5.25cm,minimum height=1.8cm] (curvature) at (3.55,-3.0)
  {\\textbf{Strict curvature}\\\\$q'''(t)>0$ inside the interval,\\\\so $q'$ is strictly convex.};
\\node[archview,text width=5.25cm,minimum height=1.15cm] (minimum) at (-3.55,-5.8)
  {Minimality and support endpoints};
\\node[archview,text width=5.25cm,minimum height=1.15cm] (plateau) at (3.55,-5.8)
  {Admissibility; a positive constant\\\\interval; analytic regularity};
\\draw[archflow] (gap.south)--(joint.north);
\\draw[archflow] (joint.south)--(0,-1.7)--(-3.55,-1.7)--(contact.north);
\\draw[archflow] (0,-1.7)--(3.55,-1.7)--(curvature.north);
\\draw[archflow] (contact.south)--node[archnote]{requires}(minimum.north);
\\draw[archflow] (curvature.south)--node[archnote]{requires}(plateau.north);
\\end{tikzpicture}
\\caption{Which ingredients does the contradiction use? Arrows point from a conclusion to its inputs. Both branches are needed in the stated SK setting. Minimality supplies contact; the curvature estimate itself applies without minimality. This is one branch of the ordinary argument, not an extracted Lean proof graph. Zero coefficients and initial or terminal gaps require separate treatment.}
\\label{fig:joint-inputs}
\\end{figure}

Now suppose a reader accepts the final integral comparison but wants to know
why the curvature is strict. The [short paper, section “Minimality gives
contact; curvature excludes gaps”](../qaoa-sk/short/paper.md#contact) identifies
the estimate at its use. Its next section, “The integrated estimate”, gives
the compact analytic explanation. Two long passages are
recorded as expansions of that section. [Long §§4.1–4.4](../qaoa-sk/long/reasoning-record.md#curvature-and-gap-certificate)
derive the integrated inequality: a correction with zero expectation makes
positivity accessible even though the original integrand can be negative.
[Long §4.5](../qaoa-sk/long/reasoning-record.md#fixed-time-coercivity)
then transfers the estimate to the stated coefficient class and proves
strictness for the limiting solution. Positive approximants alone would
not suffice, since their margins could tend to zero.

These destinations answer different doubts. The first maps the analytic
ingredients, while the second directly maps the strict-curvature claim.
Both have an authored expansion link to the short treatment. A list of
passages sharing the final claim would therefore miss one useful explanation.
Figure 3 shows these links and the claim's citation of
[Proposition 5.1 of the original manuscript](https://github.com/openai/math/blob/adc7f1241b42e322a6451854ab7e4b4c146bf78a/preprints/Full-support-of-the-zero-temperature-Sherrington-Kirkpatrick-order-parameter-September-27-2026/build/curvature.tex#L9-L52).
The proposition applies on an admissible positive plateau without assuming
minimality. The reader brings that conditional estimate back to the short
account and resumes the gap proof: strict curvature puts $q'$ below the
endpoint chord, and contact makes its integral too small. The contact
hypothesis has survived the excursion.

\\begin{figure}[H]
\\centering
\\begin{tikzpicture}
\\node[archrecord,text width=5.4cm,minimum height=1.35cm] (short) at (0,0)
  {\\textbf{Start and return: short \\S3}\\\\The integrated estimate};
\\node[archbox,text width=5.3cm,minimum height=1.5cm] (analytic) at (-4.1,-2.8)
  {\\textbf{Long \\S\\S4.1--4.4}\\\\Finite-step calculation\\\\and integrated positivity};
\\node[archbox,text width=5.3cm,minimum height=1.5cm] (limit) at (4.1,-2.8)
  {\\textbf{Long \\S4.5}\\\\Transfer of the estimate\\\\and strictness for the limit};
\\draw[archreading] (analytic.north)--(-4.1,-1.35)--node[archnote]{expands}(-1.8,-1.35)--([xshift=-1.8cm]short.south);
\\draw[archreading] (limit.north)--(4.1,-1.35)--node[archnote]{expands}(1.8,-1.35)--([xshift=1.8cm]short.south);
\\node[archbox,text width=9cm,minimum height=1.25cm] (claim) at (0,-5.15)
  {\\textbf{Strict curvature on a positive plateau}\\\\The claim used in the gap proof};
\\draw[archflow] (short.south)--node[archnote,pos=.55]{maps to\\\\claim}(claim.north);
\\draw[archflow] (limit.south)--(4.1,-4.15)--node[archnote,pos=.35]{maps to claim}(3,-4.15)--([xshift=3cm]claim.north);
\\node[archbox,text width=5.2cm,minimum height=1.25cm] (citation) at (-4.0,-7.65)
  {\\textbf{Original-proposition citation}\\\\The supplier of the estimate};
\\node[archbox,text width=5.2cm,minimum height=1.25cm] (source) at (4.0,-7.65)
  {\\textbf{Original Proposition 5.1}\\\\The retained source edition};
\\draw[archfield] ([xshift=-4cm]claim.south)--node[archnote]{citation reference}(citation.north);
\\draw[archfield] (citation.east)--node[archnote,text width=1.8cm]{identifies\\\\the source}(source.west);
\\end{tikzpicture}
\\caption{Leave an estimate, recover its argument, return. Dashed arrows record that a fuller passage expands the short treatment: a reader follows them backwards to visit the long record, then returns to the same short passage. Solid arrows are direct claim mappings. Dotted arrows follow the claim's citation to its source edition. The left-hand treatment supplies analytic ingredients without directly mapping the final curvature claim. These are selected reading and source relations, not proof edges.}
\\label{fig:excursion-return}
\\end{figure}

The reading website presents authored links separately from shared-claim
matches and can keep the original passage beside a visit to another account.
A selected passage also opens its mapped claims and recorded inputs. The
selection concerns whole passages, so it does not assign proof provenance to
each selected sentence. In a standalone PDF, descriptive paper and section
references preserve the route when the other files are unavailable; public
source links remain clickable.

A reader who does not yet understand a gap can instead enter the
[exposition, section “What a gap means”](../qaoa-sk/expository/main.md#2-what-a-gap-means).
Its example separates a positive cumulative value from vanishing increments.
The later section “Why a flat interval cannot minimise” develops the contact
and area argument. This route teaches the objects that the specialist route
assumes. The graph connects the example to the Stieltjes-measure definition
and records its use in the later argument; reading each passage supplies the
explanation.

## 4. What survives a shorter account

Shortening the example cannot change “an admissible minimiser” into “an
admissible function”. Constant functions are allowed candidates, and the
curvature estimate does not say they minimise the functional. Without
minimality, the endpoint contact used in the contradiction is missing.
The short account must retain that premise where it states and uses the
no-gap conclusion.

It must also preserve the result's extent. Full support says that every
nonempty relatively open interval receives mass. It does not alone assert
a density, let alone a strictly positive density. The stronger density
conclusion in the source has a further argument. Likewise, the broader QAOA
claim requires approximation and circuit arguments beyond full support.
Different accounts may stop at different conclusions, provided each makes
its own stopping point clear.

The passage maps help enforce this discipline. For the claims an author
selects, the checks require the recorded assumptions, citations and unresolved
obligations to remain in the map. They can catch a missing reference or an
unreconciled change to mapped text. They cannot tell whether the theorem's
wording still states the assumption, or whether the cited argument is adequate.
Those are questions for mathematical and editorial review.

Attribution survives the same selection. The no-gap theorem retains credit
for the earlier support result and for the quantitative proof being explained.
A reference may supply a theorem, an adapted construction or historical
context. Recording that role avoids treating every citation as a logical
dependency while still letting the reader recover the relevant source.

## 5. Explanation, formal evidence and navigation

A reader may next ask whether the no-gap conclusion has a formal counterpart.
The project records a correspondence with a selected Lean statement. That
statement assumes an admissible minimiser on a Brownian system and supplies
full support, strict increase and associated moment identities. It does not
assert minimiser existence or QAOA circuit convergence. The
[comparison specification](https://github.com/openai/math/blob/adc7f1241b42e322a6451854ab7e4b4c146bf78a/lean/ComparatorChallenges/SKFullSupport.lean#L81-L92)
states the target; a separate
[implementation source](https://github.com/openai/math/blob/adc7f1241b42e322a6451854ab7e4b4c146bf78a/lean/OAI/Probability/SKSupport/Main.lean#L35-L61)
contains the candidate proof. Neither link certifies every sentence of the
exposition.

Even a close correspondence may need explanation. The [long record's section
“The support statement and the derivative bridge”](../qaoa-sk/long/reasoning-record.md#formal-interfaces)
compares a formal limit along prescribed step sizes with the ordinary
right derivative used in the manuscript. Convexity orders the intervening
secant slopes, so their limit is fixed by the sampled ones. This mathematical
bridge, with its hypotheses, is what connects the formulations. The
correspondence record lets a reader locate it.

The design therefore preserves three distinct activities. The written account
explains why a conclusion follows. Formal checking tests a precise statement
and proof in a specified environment. Navigation helps a reader find the
account, formal statement and records of the checks. None can stand in for
the other two.

Checking outcomes also retain their scope. Identifying unchanged source
bytes, building a Lean project, comparing it with a separately stated challenge,
and reviewing its mathematical interpretation answer different questions.
For the SK example, a [source-bound Support build and dependency extraction](https://wcook04.github.io/lean-exposition-site/verification/full-support-build-extraction-observation-20261026.json)
completed on 26 October 2026. The extracted conditional full-support root
retains its hypotheses and external dependency boundaries. Comparator
acceptance and the scalar-target results remain pending. These observations
do not certify the English accounts. Earlier unsuccessful runs remain
observations of those runs, rather than counterexamples to the theorem.

Reviews concern particular editions. If an author changes a hypothesis or
maps the same paragraph to a different formal statement, the correspondence
has changed even when much of the prose has not. The project keeps the text,
map and sources identifiable together so a review can be understood in its
original context. A revised edition needs review of the affected claim.

## 6. How a correction changes the reading route

A recorded revision shows why the relationships between accounts need
maintenance. An earlier exposition used an explicit calculation to exclude
empty support, while placing that calculation in a section described as
optional. The theorem was sound, but the promised main reading route still
needed the later calculation. The [revision record](../qaoa-sk/source-review/references-and-adversarial-review.md#reuse-changed-cases-and-proof-destinations-26-october-2026)
describes the decision to use a short qualitative argument instead. The
current papers exhibit that change; this is a reconstruction from the
recorded review and adoption, rather than an observed reader experiment.

Empty support would give $\\gamma=0$. The analytic inputs then make $q$
strictly convex, with $q(0)=0$ and $q(t)\\leq1$ for $t<1$. Here it is $q$
itself that is convex, unlike $q'$ in the positive-gap example. For
$0<t<s<1$, a chord gives
$$
q(t)\\leq\\frac{t}{s}q(s)\\leq\\frac{t}{s}.
$$
Letting $s$ tend to one yields only $q(t)\\leq t$. Strictness comes from a
second, finite chord: for $t<v<1$,
$$
q(t)<\\frac{t}{v}q(v)\\leq t.
$$
Thus $\\int_0^1(q(t)-t)\\,dt<0$. Adding a small atom at zero is an admissible
variation, and minimality requires this integral to be nonnegative. That
contradiction closes the empty case without the explicit calculation or a
value of $q$ at one.

The same repair has different consequences in the three accounts. The
[long record, §5](../qaoa-sk/long/reasoning-record.md#empty-support-chord),
retains the complete deduction. The short paper includes it in the gap-case
proof. The exposition explains the second chord before its optional material.
The exact zero-coefficient calculation and the stronger quantitative terminal
estimate remain available for their additional information. Figure 2's
bounded positive-gap argument is unchanged. Reconciliation means deciding
which uses need which changes, rather than copying one replacement paragraph
everywhere.

The new ordinary deduction has its own claim record and mappings to these
three uses. Following recorded consumers gives an author candidates to
inspect. It does not find every sentence affected by a reading promise:
headings, optional routes, this companion and the guides also need reading.
The current passage maps cover the three mathematical accounts, not every
explanation in the repository.

Checks help with a different part of the repair. A reading link binds both
passages to their editions. Changing its destination can therefore make the
link stale even when its other end is unchanged. Refreshing those bindings
identifies the successor; it does not renew the old review. The author must
judge the revised claim and the usefulness of the link, retaining the earlier
review with the edition it concerned. A passage can also stay textually
unchanged while its proposed correspondence changes.

The local editorial decision applied the existing requirement that an
optional section be dispensable for the promised route. It supplies no
causal evidence that a new writing rule improved the result. Written methods
guide source selection, detailed reconstruction, expert selection and
exposition; a criticism may call for applying existing guidance, moving it
to the relevant decision, or changing it. A proposed general change needs
checks on two different cases and an exception. For instance, replacing a
quantitative lemma by an existence proof is harmless only if no retained
use needs its bound. A source-supported local repair and a useful method
for another author remain different achievements.

## 7. When is the extra structure useful?

Ordinary papers with careful references remain useful. The additional work
here is maintaining explicit relationships across several accounts, so that
a reader or an author can find a claim's assumptions, locate a missing
derivation and identify recorded passages affected by a correction. The
structure earns its place only if these journeys are useful. It also costs
time: maps need authoring, changes need reconciliation, and correspondence
still needs mathematical judgment. Several accounts that reuse an estimate
differently give those costs a purpose. A stable note for one audience, with
a few precise references, may need no such additional structure.

The arrangement builds on existing practices. In particular,
[leanblueprint](https://github.com/PatrickMassot/leanblueprint/tree/56e066d30fb7b608a63f4241fee80982d7eae3ef)
already connects informal statements with formal declarations and their
dependencies. Lean Exposition's emphasis is the maintained relationship
between several authored accounts, their selected passages and the distinct
evidence behind them. It makes no claim to have invented informal-to-formal
links or demonstrated a comparative learning benefit.

The common record centralises claim identity and recorded evidence. The
independent formulations still need comparison and maintenance. Separating
the annotations from the prose lets each account read as a paper. The papers
and maps can be captured as one edition for another reader or application;
external source references identify what to consult, although the referenced
bytes need not travel with the package. The operating instructions belong
in the repository's guides.

The two journeys suggest concrete tests of value. Can a reader recover the
needed curvature argument, retain its hypotheses and resume the contradiction?
Can an author find and adjudicate the recorded uses of a changed argument
without overlooking an optional route? A comparison should give both groups
the same sources and careful ordinary references, then measure correct
reconstruction and maintenance effort separately. Finding a destination,
passing a structural check and explaining why the second chord restores
strictness are different observations. The drafts have received source-based
agent review; independent human acceptance and improved comprehension remain
unestablished. The intended result is a shorter route from
“I do not understand this step” to the argument that resolves it, with its
assumptions and credit still attached.

**Figure credit.** The diagrams adapt this companion's shared-claim,
two-input and passage-to-source studies, derived from Will Cook's
[*A Repository-Based System for Research and Publication*](https://github.com/wcook04/plectis-erdos/blob/61fb590921e3b5a100dc264bed052c9cf6959daf/paper/systems/claim-faithful-publication-systems-paper.tex)
([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)). Their subjects,
labels and reading order have been revised for this account.
`,C=e(),w=[{table:`nodes`,noun:`records`,meaning:`claims, assumptions, main results and Lean declarations`},{table:`edges`,noun:`links`,meaning:`each saying that one record is used in the argument for another, that a Lean declaration corresponds to a result, or that one record cites another`},{table:`citations`,noun:`citations`,meaning:`links from a record to a place in a source`},{table:`sources`,noun:`sources`,meaning:`papers and files, identified by address and, for files, by a hash of their bytes`},{table:`evidence`,noun:`check records`,meaning:`checks, including those planned but not run`}],T={draft:`draft`,needs_revision:`needs revision`,approved:`approved`,reviewed:`reviewed`};function E(e){return T[e]??e.replace(/_/g,` `)}var D=`companion`,O=[{film:m(`mathematics`),shows:`A walkthrough of his work on one Erdős problem, from the question to the formal proof.`},{film:m(`mathematics-overview`),shows:`A tour of the maths map, including the long record and the papers for problem #257.`},{film:m(`atlas`),shows:`One result followed through Plectis Atlas, its claims compared with the checked statement.`}],k=m(`introduction`);function A({film:e}){let t=l(e);return e.youtube?(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(b,{href:e.youtube,children:e.title}),t?(0,C.jsxs)(`span`,{className:`about__len`,children:[t,` min`]}):null]}):(0,C.jsx)(`span`,{children:e.title})}function j({route:e}){let{snapshot:t,overview:l,graph:p,map:T}=c(),j=T.records.evidence,N=j.filter(e=>e.status===`not_run`).length*2>j.length,P=(0,x.useRef)(null),[F,I]=(0,x.useState)(!!e.anchor&&e.anchor!==`edition`),L=(0,x.useMemo)(()=>{let e=new TextEncoder().encode(S),t=o({stage:`architecture`,bytes:e,documentPath:`architecture/paper.md`,documentPaths:a(s(),`qaoa-sk/`)});return{html:t.renderAll().map(e=>e.html).join(`
`),front:t.frontMatter??{}}},[]),R=String(L.front.title??`The architectural companion`),z=L.front.subtitle?String(L.front.subtitle):null,B=L.front.date?String(L.front.date):null;(0,x.useLayoutEffect)(()=>{let e=P.current;if(e&&F)return e.innerHTML=L.html,u(e)},[L,F]),(0,x.useEffect)(()=>{e.anchor&&(e.anchor!==`edition`&&I(!0),requestAnimationFrame(()=>document.getElementById(e.anchor)?.scrollIntoView({block:`start`})))},[e.anchor]);let V=r.map(e=>l.papers.find(t=>t.stage===e)).filter(e=>!!e),H=(l.papers.find(e=>e.stage===`long`)?.paper_scope.selected_goal_ids??p.goals).find(e=>p.nodes.has(e)),U=H?p.nodes.get(H).label:null;return(0,C.jsxs)(`article`,{className:`about`,children:[(0,C.jsxs)(`header`,{className:`about__intro`,children:[(0,C.jsx)(`h1`,{children:`About this site`}),(0,C.jsxs)(`p`,{className:`about__lede`,children:[`This site presents one mathematical result`,U?(0,C.jsxs)(C.Fragment,{children:[`, `,(0,C.jsx)(`a`,{href:i({view:`map`,node:H}),children:U}),`,`]}):null,` `,`and three written accounts of it. The `,(0,C.jsx)(`a`,{href:i({view:`read`,stage:`expository`}),children:`exposition`}),` `,`explains the ideas with worked examples. The `,(0,C.jsx)(`a`,{href:i({view:`read`,stage:`short`}),children:`short paper`}),` `,`states the result and proves it for readers who know the field. The`,` `,(0,C.jsx)(`a`,{href:i({view:`read`,stage:`long`}),children:`long record`}),` reconstructs each step of the argument and names the source each step comes from.`]}),(0,C.jsx)(`p`,{className:`about__lede`,children:`Each step of the argument is stored as a record: a claim, an assumption, or a declaration in Lean, a language in which a computer can check proofs. Links between records say which records the argument for a result uses. Passages in the three accounts are linked to the records they discuss, so from a passage you can open its records, and from a record you can open the passages about it.`}),(0,C.jsxs)(`p`,{className:`about__lede`,children:[`Some records have `,(0,C.jsx)(`a`,{href:i({view:`checks`}),children:`checks`}),` attached, for example whether a cited file still has its recorded hash, or whether a Lean project compiles. Each check has a recorded outcome: passed, failed, unavailable or not run.`,N?` Most checks on this site have not been run.`:``]})]}),(0,C.jsxs)(`section`,{className:`about__key`,"aria-labelledby":`about-key`,children:[(0,C.jsx)(`h2`,{id:`about-key`,children:`How the argument map is drawn`}),(0,C.jsxs)(`ul`,{className:`about__keylist`,children:[(0,C.jsxs)(`li`,{children:[(0,C.jsxs)(`span`,{className:`about__sample`,children:[p.origins.filter(e=>e.slot>0).map(e=>(0,C.jsx)(`span`,{className:`src-sq`,"data-slot":e.slot,"aria-hidden":`true`},e.family)),(0,C.jsx)(`span`,{className:`src-sq`,"data-slot":0,"aria-hidden":`true`})]}),(0,C.jsx)(`span`,{children:`Each record has a small coloured square and the name of the source it comes from. Records from the same source have the same colour.`})]}),(0,C.jsxs)(`li`,{children:[(0,C.jsxs)(`span`,{className:`about__sample about__sample--lines`,"aria-hidden":`true`,children:[(0,C.jsx)(`span`,{className:`rel-sample`}),(0,C.jsx)(`span`,{className:`rel-sample rel-sample--formalizes`})]}),(0,C.jsx)(`span`,{children:`A line joins a record to a result whose argument uses it, with the arrowhead at the result. A grey, solid line is a recorded use. A cyan, dashed line joins a result to the Lean declaration recorded as corresponding to it.`})]}),(0,C.jsxs)(`li`,{children:[(0,C.jsx)(`span`,{className:`about__sample`,"aria-hidden":`true`,children:(0,C.jsx)(`span`,{className:`about__tag`,children:`Assumes`})}),(0,C.jsx)(`span`,{children:`An assumption is a violet tag with a dotted border, shown on each result that assumes it. When several results use a record that has no recorded inputs of its own, the record is drawn under each of them, with a coloured band along the bottom of each copy.`})]}),(0,C.jsxs)(`li`,{children:[(0,C.jsx)(`span`,{className:`about__sample`,"aria-hidden":`true`,children:(0,C.jsx)(`span`,{className:`rel-sample rel-sample--lit`})}),(0,C.jsx)(`span`,{children:`Amber outlines the record or link you have selected, and the keyboard focus. When you trace what a record rests on, its grey lines turn amber; assumption tags and Lean lines on the traced route keep their own colours and are drawn brighter.`})]})]}),(0,C.jsx)(`p`,{className:`about__keynote`,children:`A word in small capitals on each card names the kind of record: claim, assumption, main result or Lean declaration. Only assumption cards have a dashed border. When you choose an account under “Records used by”, each card carries one of three marks: the record has a passage of its own in that account, the account uses it without a passage of its own, or the account does not use it.`}),(0,C.jsx)(`p`,{className:`about__keynote`,children:`The map has three views. Steps opens the main result at reading size. Overview fits the whole argument on the screen; as you zoom out, each card first shows only its title and then becomes a small tile in its source’s colour, which keeps its title for as long as the tile has room for it. Outline shows the same argument as a list you scroll. Scrolling up or down zooms in and out around the pointer, and dragging moves the map.`}),(0,C.jsx)(`p`,{className:`about__keynote`,children:`Clicking a card opens its record in a panel, opens every record below it, and moves the map so that the card and all of those records are in view. Clicking an empty part of the map closes the panel and puts the map back as it was. Resting the pointer on a card draws the records below it at half strength until the pointer leaves. The card’s “Inputs” button, or the Space key, draws only the records it uses directly, and the arrow keys move between cards. Pointing at a line shows a short description of that step, and selecting the line opens the step. “Show all branches” and “Collapse branches”, at the bottom right of the map, open or close every branch at once.`}),(0,C.jsxs)(`p`,{className:`about__keynote`,children:[`The key row under the `,(0,C.jsx)(`a`,{href:i({view:`map`}),children:`argument map`}),`’s header shows the colours, lines and marks in short; the Key button shows or hides it. On the checks page each outcome is written as a word, and only a failed outcome is shown in colour.`]})]}),(0,C.jsxs)(`section`,{className:`about__serves`,id:`edition`,"aria-labelledby":`serves`,children:[(0,C.jsx)(`h2`,{id:`serves`,children:`The edition you are reading`}),(0,C.jsx)(`p`,{children:`The records and the three accounts belong to one captured edition, a fixed set of files identified below. The published website includes that capture. When run against the local read-only server, the site pins requests to the same edition and asks you to reload if the server changes it. The architectural companion and downloadable PDFs are copied separately from the same source checkout when the website is built.`}),(0,C.jsxs)(`dl`,{className:`facts`,children:[(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`dt`,{children:`Edition`}),(0,C.jsxs)(`dd`,{children:[`Bundle `,(0,C.jsx)(`code`,{translate:`no`,children:t.bundle_id}),`, version `,t.bundle_version,`. Manifest SHA-256`,` `,(0,C.jsx)(`code`,{translate:`no`,className:`about__hash`,children:t.manifest_sha256}),(0,C.jsxs)(`span`,{className:`about__copies`,children:[(0,C.jsx)(M,{label:`Copy link to this edition`,text:()=>f({view:`map`},t)}),(0,C.jsx)(M,{label:`Copy citation`,text:()=>d({place:U??void 0},{view:`map`,node:H},t)})]})]})]}),(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`dt`,{children:`Accounts`}),(0,C.jsx)(`dd`,{children:(0,C.jsx)(`ul`,{children:V.map(e=>(0,C.jsxs)(`li`,{children:[(0,C.jsx)(`a`,{href:i({view:`read`,stage:e.stage}),children:n[e.stage].short}),`: `,E(e.state),`,`,` `,E(e.review_state),`; `,e.passages,` passages linked to records, in `,e.sections,` sections.`]},e.stage))})})]}),(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`dt`,{children:`Records`}),(0,C.jsx)(`dd`,{children:(0,C.jsx)(`ul`,{children:w.filter(e=>l.record_counts[e.table]!==void 0).map(e=>(0,C.jsxs)(`li`,{children:[(0,C.jsx)(`span`,{className:`num`,children:l.record_counts[e.table]}),` `,e.noun,`: `,e.meaning,`.`]},e.table))})})]}),(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`dt`,{children:`Run it yourself`}),(0,C.jsxs)(`dd`,{children:[(0,C.jsx)(`code`,{children:`lean-exposition serve`}),` starts the read-only server, and `,(0,C.jsx)(`code`,{children:`npm run dev`}),` in `,(0,C.jsx)(`code`,{children:`site/`}),` `,`starts this site. The repository’s `,(0,C.jsx)(`code`,{children:`site/README.md`}),` lists the full commands.`]})]})]})]}),(0,C.jsxs)(`section`,{className:`about__companion`,"aria-labelledby":`companion-title`,children:[(0,C.jsx)(`h2`,{id:`companion-title`,className:`visually-hidden`,children:`The architectural companion`}),(0,C.jsxs)(`div`,{className:`about__copies`,children:[(0,C.jsx)(`button`,{type:`button`,className:`control about__open`,"aria-expanded":F,"aria-controls":D,onClick:()=>I(e=>!e),children:F?`Close the architectural companion`:`Read the architectural companion`}),(0,C.jsxs)(`a`,{className:`control`,href:`/lean-exposition-site/${h.architecture.path}`,target:`_blank`,rel:`noopener`,children:[`Open the companion PDF, `,(0,C.jsxs)(`span`,{className:`num`,children:[h.architecture.pages,` pages`]})]})]}),(0,C.jsx)(`p`,{className:`about__open-note`,children:`A longer paper, written for this project, on why the result is written up as three accounts linked to one set of records, and on how those records and links are made.`}),(0,C.jsxs)(`div`,{id:D,hidden:!F,children:[(0,C.jsxs)(`header`,{className:`about__head`,children:[(0,C.jsx)(`h1`,{children:R}),z&&(0,C.jsx)(`p`,{className:`about__subtitle`,children:z}),B&&(0,C.jsx)(`p`,{className:`about__date`,children:B})]}),(0,C.jsx)(`div`,{ref:P,className:`prose about__prose`})]})]}),(0,C.jsxs)(`section`,{className:`about__made`,id:`made-by`,"aria-labelledby":`made-by-title`,children:[(0,C.jsx)(`h2`,{id:`made-by-title`,children:`Who made this site`}),(0,C.jsxs)(`p`,{children:[_,` made this site. It is one part of `,(0,C.jsx)(b,{href:g.plectis,children:`Plectis`}),`, his projects on researching mathematics with AI and on tools that help people follow what AI produces. His own research is on Erdős problems, questions posed by the mathematician Paul Erdős.`]}),(0,C.jsxs)(`p`,{children:[`Two of his other projects sit closest to this one. His `,(0,C.jsx)(b,{href:g.mathsMap,children:`maths map`}),` on Plectis lets you see how the proofs, papers and explanations of his Erdős problem research connect. On`,` `,(0,C.jsx)(b,{href:g.atlas,children:`Plectis Atlas`}),`, the results in OpenAI’s mathematics release are set beside the outside reports that assess them, and family 281, the result explained here, has `,(0,C.jsx)(b,{href:g.atlasFamily,children:`its own page`}),`. Here that one result is taken further: an argument map of its proof, and three written accounts of it, each linked to the map.`]}),(0,C.jsx)(`p`,{children:`Two films accompany this result: one shows how to use this site, and one explains the mathematics. His walkthrough of Erdős problem #257 is linked below.`}),(0,C.jsxs)(`div`,{className:`about__films`,children:[(0,C.jsx)(y,{film:m(`interfaces`),size:`small`,sizes:`(min-width: 700px) 320px, 100vw`}),(0,C.jsx)(y,{film:m(`sk-no-gap`),size:`small`,sizes:`(min-width: 700px) 320px, 100vw`})]}),(0,C.jsx)(`ul`,{className:`about__links`,children:O.map(({film:e,shows:t})=>(0,C.jsxs)(`li`,{children:[(0,C.jsx)(A,{film:e}),(0,C.jsx)(`span`,{children:t})]},e.id))}),(0,C.jsxs)(`p`,{children:[`All his videos are on `,(0,C.jsx)(b,{href:g.youtube,children:`his YouTube channel`}),`, and his public repositories are`,` `,(0,C.jsx)(b,{href:g.github,children:`on GitHub`}),`. To get in touch about collaboration, use the`,` `,(0,C.jsx)(b,{href:g.contact,children:`contact page on Plectis`}),`; he posts updates on `,(0,C.jsx)(b,{href:g.x,children:`X`}),`.`]}),(0,C.jsxs)(`p`,{className:`about__start`,children:[`New to his work? Start here: `,(0,C.jsx)(A,{film:k})]}),(0,C.jsx)(v,{className:`about__sisters`})]})]})}function M({label:e,text:t}){let[n,r]=(0,x.useState)({status:`idle`});return(0,x.useEffect)(()=>{if(n.status!==`copied`)return;let e=window.setTimeout(()=>r({status:`idle`}),2400);return()=>window.clearTimeout(e)},[n]),(0,C.jsxs)(`span`,{className:`copyact`,children:[(0,C.jsx)(`button`,{type:`button`,className:`control copyact__button`,onClick:async()=>{let e=t();r(await p(e)?{status:`copied`}:{status:`manual`,text:e})},children:e}),(0,C.jsx)(`span`,{className:`copyact__status`,role:`status`,children:n.status===`copied`?`Copied`:``}),n.status===`manual`&&(0,C.jsx)(`textarea`,{className:`copyact__manual`,readOnly:!0,value:n.text,"aria-label":`${e}: select and copy`,rows:3,onFocus:e=>e.currentTarget.select()})]})}export{j as AboutPage};
//# sourceMappingURL=AboutPage-BP1MhaYm.js.map