export type DiffType = 'added' | 'removed' | 'unchanged';

export interface DiffLine {
  type: DiffType;
  content: string;
  lineNumLeft: number | null;
  lineNumRight: number | null;
}

export interface DiffResult {
  lines: DiffLine[];
  addedCount: number;
  removedCount: number;
  unchangedCount: number;
}

// Simple Myers-diff inspired LCS-based diff
function lcs(a: string[], b: string[]): boolean[][] {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i]![j] = a[i - 1] === b[j - 1] ? (dp[i - 1]![j - 1] ?? 0) + 1 : Math.max(dp[i - 1]![j] ?? 0, dp[i]![j - 1] ?? 0);
    }
  }
  // backtrack
  const matched: boolean[][] = Array.from({ length: m }, () => new Array<boolean>(n).fill(false));
  let i = m, j = n;
  while (i > 0 && j > 0) {
    if (a[i - 1] === b[j - 1]) { matched[i - 1]![j - 1] = true; i--; j--; }
    else if ((dp[i - 1]![j] ?? 0) >= (dp[i]![j - 1] ?? 0)) i--;
    else j--;
  }
  return matched;
}

export function computeDiff(leftText: string, rightText: string): DiffResult {
  const leftLines = leftText.split('\n');
  const rightLines = rightText.split('\n');
  const m = leftLines.length, n = rightLines.length;
  const matched = lcs(leftLines, rightLines);

  const lines: DiffLine[] = [];
  let li = 0, ri = 0, lNum = 1, rNum = 1;
  let addedCount = 0, removedCount = 0, unchangedCount = 0;

  while (li < m || ri < n) {
    // Check if current li,ri is a match
    const isMatch = li < m && ri < n && matched[li]?.[ri] === true;
    if (isMatch) {
      lines.push({ type: 'unchanged', content: leftLines[li] ?? '', lineNumLeft: lNum++, lineNumRight: rNum++ });
      unchangedCount++;
      li++; ri++;
    } else {
      // Peek: is left line matched anywhere ahead on the right?
      let leftMatched = false;
      if (li < m) {
        for (let j = ri; j < n; j++) {
          if (matched[li]?.[j]) { leftMatched = true; break; }
        }
      }
      let rightMatched = false;
      if (ri < n) {
        for (let i2 = li; i2 < m; i2++) {
          if (matched[i2]?.[ri]) { rightMatched = true; break; }
        }
      }

      if (ri < n && (!leftMatched || rightMatched === false)) {
        // emit added
        lines.push({ type: 'added', content: rightLines[ri] ?? '', lineNumLeft: null, lineNumRight: rNum++ });
        addedCount++; ri++;
      } else if (li < m) {
        // emit removed
        lines.push({ type: 'removed', content: leftLines[li] ?? '', lineNumLeft: lNum++, lineNumRight: null });
        removedCount++; li++;
      } else {
        // safety fallback
        lines.push({ type: 'added', content: rightLines[ri] ?? '', lineNumLeft: null, lineNumRight: rNum++ });
        addedCount++; ri++;
      }
    }
  }

  return { lines, addedCount, removedCount, unchangedCount };
}
