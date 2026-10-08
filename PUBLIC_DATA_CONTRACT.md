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


## Valência verbal — autoridade terminal ORCH_RECON_000312

As acepções verbais com `predicator: true` recebem projeção da autoridade científica terminal `ORCH_RECON_000312`, sem modificações de roleset, argumentos semânticos ou proveniência.

- `valency`: `V0` a `V6`, derivado de `nuclear_argument_count`;
- `nuclear_argument_count`: inteiro entre 0 e 6, correspondente ao número de argumentos nucleares;
- `argument_roles`: lista ordenada de participantes, com rótulos públicos densos `ARG0..ARGn-1`;
- `argument_roles[].source_arg`: rótulo original da autoridade científica preservado para rastreabilidade;
- `roleset_id`, `valency_authority` e `provenance`: identificador, autoridade e evidências pertinentes ao sentido;
- `valency_authority`: `ORCH_RECON_000312`.

Para `predicator: false`, não produzir valência nem papéis fictícios; preservar a função verbal no campo correspondente. A contagem e a distribuição por valência devem ser derivadas do dataset e da metadata, e não de listas manuais fixas de sentidos.

### Distribuição certificada para este candidate

| Valência | Acepções |
|---|---:|
| V0 | 1 |
| V1 | 375 |
| V2 | 5.508 |
| V3 | 10.409 |
| V4 | 2.505 |
| V5 | 906 |
| V6 | 54 |

A normalização pública dos rótulos ARG não altera a estrutura semântica, a aridade, o frame ou a decisão científica e é auditável pelo `PUBLIC_ARG_LABEL_NORMALIZATION_LEDGER.tsv`.

## Contrato de publicação e autorização

Projeção científica terminal: `ORCH_RECON_000312` — 19.758/19.758 predicadores resolvidos, zero bloqueios. O filtro dinâmico **Valência** permite V0–V6. `PUBLIC_UI_DEPLOYMENT_AUTHORIZED = NO` até ACK explícito do Orquestrador. A publicação não está automaticamente autorizada por QA pré-deploy.
