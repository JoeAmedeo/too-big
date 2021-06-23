# PR Too Big Action

This github action allows you to enforce line change limits to pull requests. 

## Inputs

## `addLimit`

The maximum number of lines of code that can be added before failure. Leaving this value empty will skip the validation.

## `removeLimit`

The maximum number of lines of code that can be removed before failure. Leaving this value empty will skip the validation.

## `totalLimit`

The maximum number of lines of code that can be added before failure. Leaving this value empty will skip the validation.

## Example usage
```
uses: JoeAmedeo/pr-too-big@v1.0.0
with:
  addLimit: '250'
  removeLimit: '500'
  totalLimit: '600'
```