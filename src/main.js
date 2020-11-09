const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  try {
    const token = core.getInput("repo-token");
    const maxLength = core.getInput("max-length");
    const { owner, repo } = github.context.repo;

    const prNumber = getPrNumber();

    if (!prNumber) {
      core.setFailed("Could not get pull request number from context");
    }

    const octokit = new github.GitHub(token);

    const response = await octokit.pulls.get({
      owner: owner,
      repo: repo,
      pull_number: prNumber
    });

    if (maxLength) {
      core.setOutput("branch", response.data.head.ref.substring(0, Number(maxLength)));
    } else {
      core.setOutput("branch", response.data.head.ref);
    }
  } catch (error) {
    core.error(error);
    core.setFailed(error.message);
  }
}

function getPrNumber() {
  const pullRequest = github.context.payload.pull_request;

  if (!pullRequest) {
    return undefined;
  }

  return pullRequest.number;
}

run();
