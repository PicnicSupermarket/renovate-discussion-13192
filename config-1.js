module.exports = {
  token: process.env.GITHUB_TOKEN,
  onboarding: false,
  repositories: ["PicnicSupermarket/renovate-discussion-13192"],
  requireConfig: false,
  gitAuthor: "Bot <bot@example.com>",
  commitMessageAction: "Upgrade",
  commitMessageTopic: "{{depName}}",
  commitMessageExtra: "{{currentVersion}} -> {{newVersion}}",
  enabledManagers: ["dockerfile", "helmfile", "maven"],
};
