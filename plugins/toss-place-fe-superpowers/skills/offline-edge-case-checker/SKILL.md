---
name: offline-edge-case-checker
description: Check frontend implementation against offline store, POS, kiosk, table order, payment/order, network instability, and device interaction edge cases.
---

# Offline Edge Case Checker

Use this after planning or implementation to check whether the assignment handles store-like frontend risks. Think like a POS, kiosk, table order, pickup order, or dashboard reviewer.

## Check areas

- network failure
- slow network
- duplicate submit
- payment/order pending state
- retry behavior
- disabled button behavior
- local state consistency
- refresh/revisit behavior
- mobile/tablet/desktop layout
- touch and mouse interaction
- long text
- empty data
- invalid data
- API error
- partial success
- stale data
- cache invalidation
- accessibility

## Output format

### 1. Store-like failure scenarios

List offline commerce scenarios that can break trust or cause wrong operation.

### 2. Network scenarios

Check offline, slow, failed, retried, timed-out, and recovered requests.

### 3. User interaction scenarios

Check duplicate taps, rapid clicks, disabled states, pending feedback, cancel/back/refresh behavior, and accidental repeated actions.

### 4. Device/layout scenarios

Check mobile, tablet, desktop, touch, mouse, small viewport, dense data, and long text.

### 5. Data scenarios

Check empty, invalid, missing, partial, duplicated, out-of-order, and unexpected API data.

### 6. Cache/stale data scenarios

Check stale display, invalidation, revalidate timing, client refetch, and user-visible freshness expectations.

### 7. Accessibility scenarios

Check keyboard access, focus, labels, disabled semantics, color contrast, and screen-reader-friendly states.

### 8. Must-fix before submission

List the edge cases that should block submission.

### 9. Manual test checklist

Create concrete manual tests with expected behavior.
