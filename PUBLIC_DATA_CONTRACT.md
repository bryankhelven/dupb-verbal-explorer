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
