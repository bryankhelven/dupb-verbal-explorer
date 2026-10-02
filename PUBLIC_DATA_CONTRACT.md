# DUPB Explorers — contrato público JSON / JSONL

## Convenção de nomes

### Entrada individual
- `<lema>-nominal-explorer.json`
- `<lema>-nominal-explorer.jsonl`
- `<lema>-verbal-explorer.json`
- `<lema>-verbal-explorer.jsonl`
- `<lema>-multiclass-explorer.json`
- `<lema>-multiclass-explorer.jsonl`

Os diacríticos do lema são preservados. Apenas caracteres problemáticos para nomes de arquivo são substituídos.

### Recurso completo
- `dupb-nominal-explorer.json`
- `dupb-nominal-explorer.jsonl`
- `dupb-verbal-explorer.json`
- `dupb-verbal-explorer.jsonl`
- `dupb-multiclass-explorer.json`
- `dupb-multiclass-explorer.jsonl`

## Núcleo comum do JSON

```json
{
  "lemma": "...",
  "entries": [
    {
      "entry": 1,
      "senses": [
        {
          "sense": 1,
          "description": "...",
          "predicator": true
        }
      ]
    }
  ]
}
```

O JSONL contém uma acepção por linha e acrescenta `lemma` e `entry` à mesma estrutura de acepção.

## Campos específicos

Verbal:
- `verb_type`
- `semantic_class`, quando disponível
- `flags`, quando não vazio

Multi-Class:
- `pos`
- `pos_label`
- `source_text` somente nos 15 casos sem glossa isolada disponível

## Acepções sem número

- `sense` é inteiro quando a acepção possui número explícito.
- `sense: null` é usado quando a autoridade não fornece número.
- `sense_label: "IMPLICIT"` preserva os 18 casos Multi-Class explicitamente marcados como implícitos.

## Campos internos removidos do download público padrão

- `host_id`
- `source_surface`
- `source_unit_id`
- `source_gloss_disposition`
- `sense_count`
- `predicator_count`
- `non_predicator_count`
- `pos_counts`

Eles não são necessários para o uso normal do recurso e não fazem parte do contrato público padrão.


## Valência verbal

A partir deste candidate, acepções verbais com `predicator: true` incluem:
- `valency`: `V0`, `V1`, `V2` ou `V3`;
- `nuclear_argument_count`: número inteiro de argumentos nucleares;
- `argument_roles`: lista JSON ordenada de objetos `{"arg":"ARGn","role":"..."}`;
- `valency_authority`: `ORCH_RECON_000248`.

Para acepções com `predicator: false`, esses campos de valência não são materializados; `verb_function` preserva a função verbal certificada.

`V0` implica `nuclear_argument_count = 0` e `argument_roles = []`. Os únicos V0 desta authority são `anoitecer.01` e `chover.03`.

A ordem de `argument_roles` é nuclear e posicional: `ARG1`, `ARG2`, `ARG3`.
