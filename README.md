# Pull Request Branch Name

A github action that retrieves the pull request branch name and sets it in the output for other actions to use. This fork allows us to set a custom limit that the outputted branch name will be.

Originally sourced from [@mdecoleman/pr-branch-name](https://github.com/mdecoleman/pr-branch-name)

## Usage

```yaml
- uses: pactsafe/pr-branch-name@1.0.0
  id: vars
  with:
    limit: 25 # This is the maximum length of the branch name
    repo-token: ${{ secrets.GITHUB_TOKEN }}
- run: echo ${{ steps.vars.outputs.branch }}
```

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
