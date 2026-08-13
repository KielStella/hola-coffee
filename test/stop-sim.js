// Simulate cleanup logic from components/scanner/QrScanner.tsx

function simulateCleanup(scanner) {
  try {
    const maybePromise = scanner.stop();
    if (maybePromise && typeof maybePromise.then === 'function') {
      maybePromise.catch(() => {}).finally(() => scanner.clear());
    } else {
      // stop may throw synchronously in some versions; still ensure clear()
      scanner.clear();
    }
  } catch (e) {
    try {
      scanner.clear();
    } catch (err) {
      // ignore
    }
  }
}

console.log('Test 1: stop() returns a Promise that resolves')
const scanner1 = {
  stop() { return Promise.resolve(); },
  clear() { console.log('scanner1.clear called'); }
};
simulateCleanup(scanner1);

setTimeout(() => {
  console.log('\nTest 2: stop() returns a Promise that rejects')
  const scanner2 = {
    stop() { return Promise.reject(new Error('async stop failed')); },
    clear() { console.log('scanner2.clear called'); }
  };
  simulateCleanup(scanner2);
}, 50);

setTimeout(() => {
  console.log('\nTest 3: stop() throws synchronously')
  const scanner3 = {
    stop() { throw new Error('sync stop threw'); },
    clear() { console.log('scanner3.clear called'); }
  };
  simulateCleanup(scanner3);
}, 200);

setTimeout(() => {
  console.log('\nTest 4: stop() undefined (no stop)')
  const scanner4 = {
    clear() { console.log('scanner4.clear called'); }
  };
  simulateCleanup(scanner4);
}, 350);

setTimeout(() => console.log('\nSimulation complete'), 500);
