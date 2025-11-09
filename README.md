# actions


This repository contains reusable GitHub Actions for our organization.

## Available Actions

### 🔍 validate-pr
Validates if a PR only modifies specific files and has minimal changes.

**Usage:**
```yaml
- uses: your-org/actions/validate-pr@v1
  with:
    pr-number: ${{ github.event.pull_request.number }}
    additions: ${{ github.event.pull_request.additions }}
    deletions: ${{ github.event.pull_request.deletions }}
    github-token: ${{ secrets.GITHUB_TOKEN }}
```

**Outputs:**
- `should-merge` - Whether PR meets auto-merge criteria
- `files-changed` - List of changed files
- `only-target-file` - If only target file changed
- `one-line-change` - If changes are minimal

---

### 🔀 merge-pr
Automatically merges a PR with celebration message.

**Usage:**
```yaml
- uses: your-org/actions/merge-pr@v1
  with:
    pr-number: ${{ github.event.pull_request.number }}
    pr-author: ${{ github.event.pull_request.user.login }}
    github-token: ${{ secrets.GITHUB_TOKEN }}
```

**Outputs:**
- `merged` - Whether merge was successful
- `merge-sha` - SHA of merge commit

---

### 💬 comment-on-pr
Posts a comment on a PR about files that need review.

**Usage:**
```yaml
- uses: your-org/actions/comment-pr@v1
  with:
    pr-number: ${{ github.event.pull_request.number }}
    files-changed: 'file1.txt file2.txt'
    github-token: ${{ secrets.GITHUB_TOKEN }}
```

**Outputs:**
- `comment-id` - ID of the created/updated comment

---

## Complete Example

```yaml
name: Auto-merge PRs
on:
  pull_request_target:
    types: [opened, synchronize]
    
jobs:
  auto-merge:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      issues: write
      
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Validate PR
        id: validate
        uses: your-org/actions/validate-pr@v1
        with:
          pr-number: ${{ github.event.pull_request.number }}
          additions: ${{ github.event.pull_request.additions }}
          deletions: ${{ github.event.pull_request.deletions }}
          github-token: ${{ secrets.GITHUB_TOKEN }}

      - name: Merge PR
        if: steps.validate.outputs.should-merge == 'true'
        uses: your-org/actions/merge-pr@v1
        with:
          pr-number: ${{ github.event.pull_request.number }}
          pr-author: ${{ github.event.pull_request.user.login }}
          github-token: ${{ secrets.GITHUB_TOKEN }}

      - name: Comment on PR
        if: steps.validate.outputs.should-merge != 'true'
        uses: your-org/actions/comment-pr@v1
        with:
          pr-number: ${{ github.event.pull_request.number }}
          files-changed: ${{ steps.validate.outputs.files-changed }}
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

## Repository Structure

```
actions/
├── README.md (this file)
├── validate-pr/
│   └── action.yml
├── merge-pr/
│   └── action.yml
└── comment-pr/
    └── action.yml
```