# DUPB Verbal Explorer — contrato público de dados

A interface, o arquivo `data/dupb-verbal-explorer.json`, o JSONL e as exportações de entradas individuais apresentam **somente dados lexicográficos**.

Cada lema tem `lemma` e `entries`; cada entrada tem `entry` e `senses`. As acepções apresentam, conforme disponíveis: `sense`, `sense_label`, `description`, `predicator`, `verb_type`, `semantic_class`, `verb_function`, `flags`, `valency`, `nuclear_argument_count` e `argument_roles` (`arg`, `role`).

As acepções não predicadoras não recebem argumentos ou valências fictícios. As predicadoras têm `valency` V0–V6 e papéis semânticos em `argument_roles`.

A documentação acadêmica das origens é consultada independentemente no menu **Provenance**. Ela usa `data/provenance-public.json` e a projeção equivalente em JavaScript, sem identificadores de governança interna.

Os arquivos de auditoria científica operacionais não integram este contrato público. Esta separação não altera nem reinterpreta a análise científica subjacente.
