# Projects & Portfolio
> You don't *finish* a module by watching videos — you finish it by building something. These are the capstone and portfolio projects that turn knowledge into demonstrable competence. Every module in [CURRICULUM.md](./CURRICULUM.md) also has its own smaller project; this file collects the big ones.

> **Tip:** the first three core projects (full-cycle bookkeeping → month-end close → three-statement build) overlap on purpose — treat them as **one graduated project**: raw transactions → adjusting & closing → the three statements → an Excel rebuild. Don't do them as three disconnected exercises.

## Full-Cycle Bookkeeping: One Month for a Fictional Small Business
**Level:** Beginner · **After modules:** m1-accounting-equation, m2-debits-credits, m3-journal-entries, m4-ledgers-trial-balance

You are the bookkeeper for 'Bayside Bikes,' a fictional retail/service sole proprietorship. Starting from an opening trial balance, you process one full month (~25-40 source transactions: cash sales, credit sales, supplier bills, payroll, owner draws, loan payment, rent, utilities, equipment purchase). You record each transaction in a general journal, post to T-accounts/general ledger, and run an unadjusted trial balance. This is the foundational drill that proves you can take a raw business event and turn it into a balanced, posted, double-entry record without a software safety net.

**Deliverable:** A workbook (Excel/Google Sheets) containing: (1) a general journal with dated, referenced entries; (2) posted general ledger / T-accounts; (3) an unadjusted trial balance that balances to the penny; (4) a one-page narrative explaining 3 judgment calls you made (e.g., expense vs. capitalize, timing of revenue recognition).

**Skills demonstrated:** Double-entry bookkeeping, Journalizing transactions, Posting to ledgers, Preparing a trial balance, Source-document interpretation, Chart of accounts design

**Supporting resources:**
- [Principles of Accounting, Volume 1: Financial Accounting (OpenStax)](https://openstax.org/details/books/principles-financial-accounting)  
  <sub>OpenStax / Rice University · textbook · 🟢 Free · primary</sub>  
  Ch. 3-4 cover the full accounting cycle with practice problems; use the end-of-chapter comprehensive problems as transaction sources.
- [AccountingCoach (bookkeeping & debits/credits explainers + quizzes)](https://www.accountingcoach.com/)  
  <sub>AccountingCoach · course · 🟡 Freemium · supplement</sub>  
  Free Q&A, visual tutorials, and self-tests; PRO tier optional and not required.
- [David Krug / Notepirate / Tony Bell full accounting-cycle YouTube walkthroughs](https://www.youtube.com/@AccountingStuff)  
  <sub>YouTube (Accounting Stuff, Tony Bell) · video-series · 🟢 Free · supplement</sub>  
  Search 'full accounting cycle example' for end-to-end worked problems to model your project on.

## Month-End Close: Adjusting Entries, Closing Entries & the Three Statements
**Level:** Intermediate · **After modules:** m4-ledgers-trial-balance, m5-accruals-deferrals, m6-adjusting-entries, m7-financial-statements

Continuing the 'Bayside Bikes' books from Project 1 (or a supplied unadjusted trial balance), you run a real month-end close. You book the full set of adjusting entries (depreciation, accrued wages, accrued interest, prepaid expense expiry, unearned revenue earned, supplies used, bad-debt estimate), produce an adjusted trial balance, then prepare the closing entries and a post-closing trial balance. From the adjusted numbers you build a properly classified Income Statement, Statement of Owner's Equity, and Balance Sheet that articulate (net income flows to equity; ending equity flows to the balance sheet). This proves you understand accrual accounting and the close, not just data entry.

**Deliverable:** A close package: adjusting-entry journal with a one-line rationale per entry, adjusted trial balance, closing entries, post-closing trial balance, and the three linked financial statements (with a visible check that the balance sheet balances and ties to the statement of equity). Include a short 'close checklist' you followed.

**Skills demonstrated:** Accrual accounting, Adjusting & closing entries, Depreciation methods, Financial statement preparation, Statement articulation, Month-end close procedures

**Supporting resources:**
- [Principles of Accounting, Volume 1 (OpenStax) Ch. 4-5](https://openstax.org/details/books/principles-financial-accounting)  
  <sub>OpenStax · textbook · 🟢 Free · primary</sub>  
  The 'completing the accounting cycle' and adjusting-entry chapters map exactly to this project.
- [MIT OpenCourseWare 15.501 Introduction to Financial and Managerial Accounting](https://ocw.mit.edu/courses/15-501-introduction-to-financial-and-managerial-accounting-spring-2004/)  
  <sub>MIT OCW · mooc · 🟢 Free · supplement</sub>  
  Lecture notes and problem sets on accruals and statement construction.
- [AccountingCoach: Adjusting Entries & Closing the Books](https://www.accountingcoach.com/adjusting-entries/explanation)  
  <sub>AccountingCoach · article · 🟢 Free · reference</sub>

## Build the Three Statements in Excel From a Trial Balance
**Level:** Intermediate · **After modules:** m7-financial-statements, m8-statement-of-cash-flows, m9-excel-foundations

Given a raw, unstructured adjusted trial balance (a flat list of accounts and balances), you build a fully formula-driven three-statement model in Excel/Sheets with zero hard-coded outputs. You map each TB line to a statement line via lookups, build a classified Income Statement and Balance Sheet, and — the hard part — derive the Statement of Cash Flows using the indirect method purely from the two-period balance sheet movements and the income statement. The model must include a balance-sheet check cell, clean formatting, and an inputs/calcs/outputs separation. This is the single most-tested skill in finance/accounting hiring screens.

**Deliverable:** An Excel/Sheets file where changing any trial-balance input correctly flows through to all three statements; the balance sheet ties out (check cell = 0), and the indirect cash flow statement's ending cash equals the balance sheet cash. Include a documentation tab listing assumptions and the TB-to-statement mapping.

**Skills demonstrated:** Financial modeling, Indirect method cash flow construction, Excel (SUMIF/XLOOKUP/INDEX-MATCH), Model structure & error-checking, TB-to-statement mapping, Statement linkage

**Supporting resources:**
- [Wall Street Prep / CFI 3-statement modeling free guides & templates](https://corporatefinanceinstitute.com/resources/financial-modeling/3-statement-model/)  
  <sub>Corporate Finance Institute (CFI) · article · 🟡 Freemium · primary</sub>  
  Several free templates and step-by-step articles; paid certification optional.
- [ExcelIsFun & Leila Gharani Excel-for-accounting playlists](https://www.youtube.com/@LeilaGharani)  
  <sub>YouTube · playlist · 🟢 Free · supplement</sub>  
  Lookup functions, dynamic arrays, and dashboard formatting.
- [SEC EDGAR Financial Statement Data Sets](https://www.sec.gov/dera/data/financial-statement-data-sets)  
  <sub>U.S. SEC · practice · 🟢 Free · practice</sub>  
  Pull a real company's tagged numbers to use as an alternate trial-balance source.

## Budgeting & Variance Analysis Model for a Small Business
**Level:** Intermediate · **After modules:** m10-managerial-accounting, m11-cost-behavior-cvp, m9-excel-foundations

Step into the management-accounting seat. For a fictional product business you build a master budget: a sales budget, production/purchases budget, cost-of-goods and operating-expense budgets, and a 12-month cash budget with a revolving financing line. You then layer in a flexible budget and perform variance analysis — comparing actual results to both static and flexible budgets, decomposing the difference into price/rate vs. volume/efficiency variances, and flagging which variances are material and likely controllable. The deliverable proves you can support decisions, not just record history.

**Deliverable:** An Excel/Sheets budgeting model with driver-based assumptions, a 12-month cash budget, a flexible-budget variance report (favorable/unfavorable with $ and %), and a one-page management memo recommending two corrective actions based on the largest variances.

**Skills demonstrated:** Master budgeting, Flexible budgets & variance analysis, Cost-volume-profit analysis, Cash flow forecasting, Scenario/driver modeling, Management reporting & memo writing

**Supporting resources:**
- [Principles of Accounting, Volume 2: Managerial Accounting (OpenStax)](https://openstax.org/details/books/principles-managerial-accounting)  
  <sub>OpenStax · textbook · 🟢 Free · primary</sub>  
  Budgeting and standard-costing/variance chapters provide formulas and practice data.
- [Saylor Academy BUS105 Managerial Accounting](https://learn.saylor.org/course/BUS105)  
  <sub>Saylor Academy · mooc · 🟢 Free · supplement</sub>  
  Free self-paced course; optional low-cost proctored exam for a certificate.
- [Edspira managerial accounting & variance videos](https://www.youtube.com/@Edspira)  
  <sub>YouTube (Edspira) · video-series · 🟢 Free · supplement</sub>

## Bookkeeping & KPI Dashboard in Power BI / Google Sheets
**Level:** Intermediate · **After modules:** m4-ledgers-trial-balance, m7-financial-statements, m9-excel-foundations, m12-data-tools-bi

Turn a year of transaction-level data into a self-service finance dashboard. Starting from a messy CSV general-ledger export (hundreds of rows), you clean and model the data (Power Query / Sheets), build a date table and a chart-of-accounts dimension, and create measures for revenue trend, gross margin, expense breakdown, cash position, AR aging, and a few KPIs (current ratio, burn rate, top customers/vendors). You design an interactive one-page dashboard with slicers that a non-accountant owner could actually read. This proves the modern, employable overlap of accounting + data.

**Deliverable:** A published Power BI report (.pbix) or interactive Google Sheets/Looker Studio dashboard with: a cleaned data model, at least 6 measures/KPIs, an AR-aging visual, and drill-down by month/account/customer — plus a short written 'data dictionary' and refresh instructions.

**Skills demonstrated:** Data cleaning (Power Query), Dimensional data modeling, DAX / spreadsheet measures, Financial KPI design, Data visualization, Self-service BI / reporting

**Supporting resources:**
- [Microsoft Learn — Power BI Data Analyst learning paths](https://learn.microsoft.com/en-us/training/powerplatform/power-bi)  
  <sub>Microsoft · course · 🟢 Free · primary</sub>  
  Power BI Desktop is free; full guided modules from import to publish.
- [Enterprise DNA / Guy in a Cube Power BI YouTube channels](https://www.youtube.com/@GuyInACube)  
  <sub>YouTube · playlist · 🟢 Free · supplement</sub>
- [Kaggle public financial/transaction datasets](https://www.kaggle.com/datasets)  
  <sub>Kaggle · practice · 🟢 Free · practice</sub>  
  Search 'general ledger', 'accounts receivable', or 'sample superstore' for realistic transaction CSVs to model.

## Financial Statement Analysis of a Real Public Company's 10-K
**Level:** Advanced · **After modules:** m7-financial-statements, m8-statement-of-cash-flows, m13-ratio-analysis

Pick a real public company, pull its most recent Form 10-K (and the prior year) from SEC EDGAR, and perform a full financial-statement analysis. You build a clean spreadsheet of 2-3 years of the income statement, balance sheet, and cash flow statement; compute and trend the full ratio set (liquidity, solvency/leverage, activity/efficiency, profitability/DuPont, and per-share/market ratios); perform horizontal and vertical (common-size) analysis; and benchmark against one industry peer. Crucially, you read the MD&A and footnotes to explain *why* the ratios moved — revenue recognition policy, debt covenants, segment shifts, one-time items. This is what an equity/credit analyst actually does.

**Deliverable:** A 6-10 page analyst report (PDF) plus the supporting Excel model: common-size statements, a multi-year ratio table with a DuPont decomposition, peer benchmark, a red-flags/earnings-quality section drawn from the footnotes, and a clear investment- or credit-style conclusion with caveats.

**Skills demonstrated:** Ratio & DuPont analysis, Horizontal/vertical (common-size) analysis, Reading 10-K MD&A and footnotes, Earnings-quality / red-flag detection, Peer benchmarking, Analytical report writing

**Supporting resources:**
- [SEC EDGAR full-text search & company filings](https://www.sec.gov/cgi-bin/browse-edgar)  
  <sub>U.S. SEC · tool · 🟢 Free · primary</sub>  
  Free source for every 10-K, 10-Q, and 8-K; use the 'Financial Report' R-tables or XBRL viewer to speed up data extraction.
- [CFI Financial Statement Analysis & Ratio guides](https://corporatefinanceinstitute.com/resources/accounting/analysis-of-financial-statements/)  
  <sub>Corporate Finance Institute · article · 🟡 Freemium · reference</sub>
- [Aswath Damodaran 'Foundations of Finance' / valuation lectures & data](https://pages.stern.nyu.edu/~adamodar/)  
  <sub>NYU Stern (free site + YouTube) · video-series · 🟢 Free · supplement</sub>  
  Free industry-average ratio datasets and lectures for benchmarking context.

## Prepare a Sample Individual + Small-Business Tax Return From Source Documents
**Level:** Advanced · **After modules:** m14-intro-to-taxation, m15-individual-income-tax, m16-business-entity-tax

Work a realistic tax-prep engagement for a fictional taxpayer who is also a self-employed sole proprietor. From a packet of source documents (W-2, 1099-NEC, 1099-INT/DIV, business income and expense logs, mileage, home-office data, mortgage interest, charitable receipts), you prepare a complete individual return: Form 1040 with Schedule C (business profit/loss), Schedule SE (self-employment tax), Schedule 1, and either standard vs. itemized (Schedule A) with a comparison. You reconcile the books to the tax return (book-to-tax differences) and document the law/instruction citation behind each judgment call. This proves you can go from shoebox to a defensible, signed-ready return.

**Deliverable:** A completed return package using current-year IRS forms (filled by hand/PDF, no paid software required): 1040 + Schedules C, SE, 1, and A; a standard-vs-itemized comparison; a book-to-tax reconciliation worksheet; and a workpaper index citing the relevant IRS instruction/publication for each significant position.

**Skills demonstrated:** Individual income tax (Form 1040), Schedule C / self-employment tax, Itemized vs. standard deduction analysis, Book-to-tax reconciliation, Tax research & citation, Source-document organization / workpapers

**Supporting resources:**
- [IRS Forms, Instructions & Publications (1040, Sch C, SE, A; Pub 17, Pub 334, Pub 535)](https://www.irs.gov/forms-instructions)  
  <sub>Internal Revenue Service (IRS) · reference · 🟢 Free · primary</sub>  
  All forms and the plain-English Pub 17 (individuals) and Pub 334 (small business) are free PDFs.
- [IRS Link & Learn Taxes / VITA training (Pub 4491)](https://apps.irs.gov/app/vita/)  
  <sub>IRS · course · 🟢 Free · supplement</sub>  
  Free volunteer-prep training with practice scenarios and answer keys — ideal as your fictional fact pattern source.
- [Tax Foundation & IRS Free File Fillable Forms](https://www.irs.gov/e-file-providers/free-file-fillable-forms)  
  <sub>Tax Foundation / IRS · tool · 🟢 Free · practice</sub>  
  Free fillable PDFs to assemble the return without commercial software.

## Mini Audit & Internal-Controls Walkthrough Engagement
**Level:** Advanced · **After modules:** m7-financial-statements, m17-auditing-assurance, m18-internal-controls

Act as a staff auditor on a focused engagement for a fictional company. You document and evaluate the internal control over a key cycle (e.g., the revenue/cash-receipts or purchasing/disbursements cycle): produce a narrative and flowchart, identify the control activities, and map risks to controls (a risk-control matrix). You then design and execute a control walkthrough and a substantive test on a provided sample (e.g., test a sample of sales invoices for the existence/occurrence and accuracy assertions, vouch and trace, recalculate), document tickmarks and exceptions, evaluate a possible control deficiency for severity, and draft an audit workpaper plus a management-letter point. This proves audit reasoning: assertions, risk, evidence, and conclusions.

**Deliverable:** An audit workpaper set: a process narrative + flowchart, a risk-control matrix mapping assertions to controls, a completed test-of-controls/substantive worksheet with tickmark legend and noted exceptions, a deficiency-severity evaluation, and a one-page management letter recommending control improvements.

**Skills demonstrated:** Internal control documentation & evaluation, Audit assertions & risk assessment, Walkthroughs & tests of controls, Substantive testing (vouch/trace/recalculate), Sampling & exception evaluation, Audit workpaper & management-letter writing

**Supporting resources:**
- [AICPA Audit & Assurance resources + COSO Internal Control framework summary](https://www.aicpa-cima.com/topic/audit-assurance)  
  <sub>AICPA / COSO · reference · 🟢 Free · primary</sub>  
  Free overviews of the COSO five components and assertions; use to structure the risk-control matrix.
- [PCAOB Auditing Standards (AS 2110 risk, AS 2201 ICFR, AS 2301)](https://pcaobus.org/oversight/standards/auditing-standards)  
  <sub>PCAOB · reference · 🟢 Free · reference</sub>  
  Authoritative, free standards on risk assessment, controls, and evidence.
- [OpenStax / Saylor BUS302 Auditing-adjacent materials & university OCW audit cases](https://learn.saylor.org/)  
  <sub>Saylor Academy / university OCW · mooc · 🟢 Free · supplement</sub>  
  Free case studies and lecture notes to model an engagement fact pattern and sample population.

## Capstone: Forensic Investigation & Reconstruction From Incomplete Records
**Level:** Advanced · **After modules:** m6-adjusting-entries, m13-ratio-analysis, m17-auditing-assurance, m18-internal-controls

The integrative final. A fictional small business hands you a shoebox: bank statements, partial invoices, a fraud tip, and no proper books. You reconstruct the accounting records from incomplete information (using the bank statement, gross-margin, and net-worth methods), perform a full bank reconciliation, build the financial statements, then run analytical and forensic procedures — Benford's Law on disbursements, ratio anomalies, a fictitious-vendor and lapping test — to quantify a suspected misappropriation. You conclude with a defensible estimate of the loss and recommended controls. This single project forces you to chain bookkeeping, statements, analysis, and audit/forensic skills end to end.

**Deliverable:** An investigation report (PDF) plus supporting workbook: reconstructed journals and statements, a completed bank reconciliation, the analytical/forensic test workpapers (including a Benford's analysis chart), a quantified loss estimate with methodology, and a remediation memo of internal-control fixes that would have prevented the scheme.

**Skills demonstrated:** Records reconstruction from incomplete data, Bank reconciliation, Forensic analytics (Benford's Law, net-worth/gross-margin methods), Fraud scheme identification, Loss quantification, Integrative reporting across the full accounting cycle

**Supporting resources:**
- [ACFE Fraud Resources & Fraud Tree (occupational fraud taxonomy)](https://www.acfe.com/fraud-resources)  
  <sub>Association of Certified Fraud Examiners (ACFE) · reference · 🟢 Free · primary</sub>  
  Free Report to the Nations and scheme taxonomy to design a realistic fraud fact pattern.
- [Principles of Accounting Vol. 1 (OpenStax) — bank reconciliation & incomplete records sections](https://openstax.org/details/books/principles-financial-accounting)  
  <sub>OpenStax · textbook · 🟢 Free · reference</sub>
- [Benford's Law tutorials + sample disbursement datasets](https://www.kaggle.com/datasets)  
  <sub>YouTube / Kaggle · practice · 🟢 Free · practice</sub>  
  Use a public transactions dataset and a spreadsheet to run a first-digit Benford test; many free walkthroughs explain the method.
