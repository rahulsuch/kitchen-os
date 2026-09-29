/**
 * Centralized logger for tracking task execution flow
 */
export const logTaskSequence = ({
  operation,
  handler,
  apiRoute,
  controller,
  status,
  response,
  componentData
}) => {
  console.groupCollapsed(`%c ⚡ TASK COMPLETE: ${operation}`, 'color: #06b6d4; font-weight: bold; font-size: 12px;');
  
  // Print a clean table for the metadata
  console.table({
    "Operation Type": operation,
    "Handler": handler,
    "API Route": apiRoute,
    "Backend Controller": controller,
    "Status": status === "success" ? "✅ SUCCESS" : "❌ FAILED",
  });

  // Print collapsible objects for the actual data
  console.log("%c Received Data (Component):", "color: #a855f7", componentData);
  console.log("%c API Response:", "color: #22c55e", response);
  
  console.groupEnd();
};
