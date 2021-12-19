### Minimal reproduction case for Renovate discussion #13192

See Renovate discussion
[#13192](https://github.com/renovatebot/renovate/discussions/13192) for
context.

To apply either of the Renovate configurations in this repository, assign a
valid Github token to the `GITHUB_TOKEN` environment variable and execute
`./run-renovate.sh 1` or `./run-renovate.sh 2` as applicable.

This is the difference between the two configurations:

```diff
--- config-1.js
+++ config-2.js
@@ -8,4 +8,11 @@
   commitMessageTopic: "{{depName}}",
   commitMessageExtra: "{{currentVersion}} -> {{newVersion}}",
   enabledManagers: ["dockerfile", "helmfile", "maven"],
+  packageRules: [
+    {
+      matchDatasources: ["docker", "helm"],
+      commitMessageTopic: "{{depName}}",
+      commitMessageExtra: "{{currentVersion}} -> {{newVersion}}",
+    },
+  ],
 };
```

At the time of writing these configurations yield the following three pull
request titles, respectively:

Data source | `config-1.js`                                            | `config-2.js`                                 |
------------|----------------------------------------------------------|-----------------------------------------------|
Docker      | Upgrade alpine Docker tag to v3.15.0                     | Upgrade alpine 3.14.2 -> 3.15.0               |
Helm        | Upgrade Helm release kubernetes-dashboard 5.0.4 -> 5.0.5 | Upgrade kubernetes-dashboard 5.0.4 -> 5.0.5   |
Maven       | Upgrade tech.picnic:oss-parent 0.0.2 -> 0.0.3            | Upgrade tech.picnic:oss-parent 0.0.2 -> 0.0.3 |

Note that
- The Maven PR is impacted by the top-level `commitMessageAction`,
  `commitMessageTopic` and `commitMessageExtra` settings.
- The Docker and Helm PRs are impacted by the top-level `commitMessageAction`
  setting (otherwise "Update" rather than "Upgrade" would be used), but not by
  `commitMessageTopic` and `commitMessageExtra`.
- The Docker and Helm PRs can be customized further using a package rule, as is
  done in `config-2.js`.
