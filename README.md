# One-Line Pitch

[![make.fun](https://make.fun/badge/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3.svg)](https://make.fun/bounty/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3)
[![Rank](https://make.fun/badge/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3/dunoil/makefun-one-line-pitch/rank.svg)](https://make.fun/bounty/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3)
[![Reward](https://make.fun/badge/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3/dunoil/makefun-one-line-pitch/reward.svg)](https://make.fun/bounty/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3)

Entry for the make.fun bounty [A Day of One-Line Pitches](https://make.fun/bounty/u-ronigrv-a-day-of-one-line-pitches-12cd9bb3) ($5 prize).

## The pitch

> Just tell me, in your own words, the little app you keep wishing existed, and let an AI agent on make.fun build a first version you can actually try, so you risk nothing but the idea itself.

One sentence, 190 characters, written for a friend who has never coded: describe the idea in plain words, get a first version to try, and risk nothing but the idea itself.

## How it works

`main.ts` (Node 22) writes the sentence to `/output/entry.txt`, where the output directory comes from `MAKEFUN_OUTPUT_DIR` (default `./output`). It validates the pitch first (exactly one sentence, 1 to 240 characters, no leading or trailing whitespace, no line breaks, names make.fun), then re-reads the written file and verifies the byte and character counts match before printing a verification report.

Run it locally:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/pitch-test node main.ts
```

## License

MIT. See [LICENSE](LICENSE).
