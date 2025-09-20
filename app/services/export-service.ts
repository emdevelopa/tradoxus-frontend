import React from "react"
import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer"

// Export Functions for Progress Tracking Data
export async function exportProgressData(format: "csv" | "pdf", data: any): Promise<Blob> {
  console.log("Export called with format:", format, "and data:", data)

  try {
    let blob: Blob

    switch (format) {
      case "csv":
        blob = exportToCSV(data)
        break
      case "pdf":
        blob = await exportToPDF(data)
        break
      default:
        throw new Error(`Unsupported format: ${format}`)
    }

    console.log("Created blob:", blob.size, "bytes")
    if (!blob || blob.size === 0) {
      throw new Error("Failed to create export blob")
    }
    return blob
  } catch (error) {
    console.error("Export error:", error)
    throw new Error(`Failed to export data as ${format}: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Private helper functions
function exportToCSV(data: any): Blob {
  const csvRows: string[] = []

  // Add header with report info
  csvRows.push(`"Tradoxus Progress Report - Generated ${new Date().toLocaleDateString()}"`)
  csvRows.push("") // Empty row for spacing

  // Progress Summary Section
  if (data.overallProgress !== undefined) {
    csvRows.push('"=== PROGRESS SUMMARY ==="')
    csvRows.push('"Metric","Value","Percentage"')
    csvRows.push(`"Overall Progress","${data.overallProgress}","${data.overallProgress}%"`)
    csvRows.push(`"Trading Performance","${data.tradingPerformance}","${data.tradingPerformance}%"`)
    csvRows.push(`"Learning Completion","${data.learningCompletion}","${data.learningCompletion}%"`)
    csvRows.push(`"Skill Development","${data.skillDevelopment}","${data.skillDevelopment}%"`)
    csvRows.push(`"Risk Management","${data.riskManagement}","${data.riskManagement}%"`)
    csvRows.push(`"Strategy Implementation","${data.strategyImplementation}","${data.strategyImplementation}%"`)
    csvRows.push(`"Trading Consistency","${data.tradingConsistency}","${data.tradingConsistency}%"`)
    csvRows.push(`"Portfolio Growth","${data.portfolioGrowth}","${data.portfolioGrowth}%"`)
    csvRows.push(`"Trading Psychology","${data.tradingPsychology}","${data.tradingPsychology}%"`)
    csvRows.push("") // Empty row
  }

  // Performance Metrics Section
  if (data.performanceMetrics) {
    csvRows.push('"=== PERFORMANCE METRICS ==="')
    csvRows.push('"Metric","Value","Description"')
    csvRows.push(`"Total Profit","$${data.performanceMetrics.totalProfit}","Total trading profit"`)
    csvRows.push(`"Win Rate","${data.performanceMetrics.winRate}%","Percentage of winning trades"`)
    csvRows.push(`"Total Trades","${data.performanceMetrics.totalTrades}","Number of completed trades"`)
    csvRows.push(`"Profit Factor","${data.performanceMetrics.profitFactor}","Gross profit / Gross loss"`)
    csvRows.push(`"Sharpe Ratio","${data.performanceMetrics.sharpeRatio}","Risk-adjusted return"`)
    csvRows.push(`"Max Drawdown","${data.performanceMetrics.maxDrawdown}%","Maximum portfolio decline"`)
    csvRows.push("") // Empty row
  }

  // Goals Section
  if (data.goals && data.goals.length > 0) {
    csvRows.push('"=== GOALS PROGRESS ==="')
    csvRows.push('"Goal","Target","Current","Progress %","Status","Due Date"')

    data.goals.forEach((goal: any) => {
      csvRows.push(
        `"${goal.title}","${goal.target}","${goal.current}","${goal.progress}%","${goal.status}","${goal.dueDate || "N/A"}"`,
      )
    })
    csvRows.push("") // Empty row
  }

  // Achievements Section
  if (data.achievements && data.achievements.length > 0) {
    csvRows.push('"=== ACHIEVEMENTS ==="')
    csvRows.push('"Achievement","Category","Date Earned","Points","Tier"')

    data.achievements.forEach((achievement: any) => {
      csvRows.push(
        `"${achievement.title}","${achievement.category}","${achievement.dateEarned}","${achievement.points}","${achievement.tier}"`,
      )
    })
  }

  const csvContent = csvRows.join("\n")
  return new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
}

async function exportToPDF(data: any): Promise<Blob> {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#FFFFFF",
      padding: 30,
      fontFamily: "Helvetica",
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      textAlign: "center",
      color: "#0f172a",
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 15,
      marginTop: 20,
      color: "#0f172a",
      fontWeight: "bold",
      borderBottom: "2 solid #06b6d4",
      paddingBottom: 5,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
      paddingHorizontal: 10,
    },
    label: {
      fontSize: 12,
      color: "#0f172a",
      fontWeight: "bold",
      flex: 1,
    },
    value: {
      fontSize: 12,
      color: "#0f172a",
      flex: 1,
      textAlign: "right",
    },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: "#e0f2fe",
      padding: 8,
      marginBottom: 5,
    },
    tableRow: {
      flexDirection: "row",
      padding: 8,
      borderBottom: "1 solid #e0f2fe",
    },
    tableCell: {
      fontSize: 10,
      color: "#0f172a",
      flex: 1,
      textAlign: "left",
    },
    summary: {
      backgroundColor: "#f8fafc",
      padding: 15,
      marginVertical: 10,
      borderRadius: 5,
    },
    date: {
      fontSize: 10,
      color: "#666666",
      textAlign: "center",
      marginBottom: 20,
    },
  })

  const PDFDocument = () =>
    React.createElement(
      Document,
      null,
      React.createElement(
        Page,
        { size: "A4", style: styles.page },
        React.createElement(Text, { style: styles.title }, "Tradoxus Progress Report"),
        React.createElement(Text, { style: styles.date }, `Generated: ${new Date().toLocaleDateString()}`),

        // Progress Summary Section
        data.overallProgress !== undefined &&
          React.createElement(
            View,
            null,
            React.createElement(Text, { style: styles.subtitle }, "Progress Summary"),
            React.createElement(
              View,
              { style: styles.summary },
              React.createElement(
                View,
                { style: styles.row },
                React.createElement(Text, { style: styles.label }, "Overall Progress:"),
                React.createElement(Text, { style: styles.value }, `${data.overallProgress}%`),
              ),
              React.createElement(
                View,
                { style: styles.row },
                React.createElement(Text, { style: styles.label }, "Trading Performance:"),
                React.createElement(Text, { style: styles.value }, `${data.tradingPerformance}%`),
              ),
              React.createElement(
                View,
                { style: styles.row },
                React.createElement(Text, { style: styles.label }, "Learning Completion:"),
                React.createElement(Text, { style: styles.value }, `${data.learningCompletion}%`),
              ),
              React.createElement(
                View,
                { style: styles.row },
                React.createElement(Text, { style: styles.label }, "Risk Management:"),
                React.createElement(Text, { style: styles.value }, `${data.riskManagement}%`),
              ),
            ),
          ),

        // Performance Metrics Section
        data.performanceMetrics &&
          React.createElement(
            View,
            null,
            React.createElement(Text, { style: styles.subtitle }, "Performance Metrics"),
            React.createElement(
              View,
              { style: styles.summary },
              React.createElement(
                View,
                { style: styles.row },
                React.createElement(Text, { style: styles.label }, "Total Profit:"),
                React.createElement(
                  Text,
                  { style: styles.value },
                  `$${data.performanceMetrics.totalProfit.toLocaleString()}`,
                ),
              ),
              React.createElement(
                View,
                { style: styles.row },
                React.createElement(Text, { style: styles.label }, "Win Rate:"),
                React.createElement(Text, { style: styles.value }, `${data.performanceMetrics.winRate}%`),
              ),
              React.createElement(
                View,
                { style: styles.row },
                React.createElement(Text, { style: styles.label }, "Total Trades:"),
                React.createElement(Text, { style: styles.value }, `${data.performanceMetrics.totalTrades}`),
              ),
            ),
          ),

        // Goals Section
        data.goals &&
          data.goals.length > 0 &&
          React.createElement(
            View,
            null,
            React.createElement(Text, { style: styles.subtitle }, "Goals Progress (Top 10)"),
            React.createElement(
              View,
              { style: styles.tableHeader },
              React.createElement(Text, { style: [styles.tableCell, { fontWeight: "bold" }] }, "Goal"),
              React.createElement(Text, { style: [styles.tableCell, { fontWeight: "bold" }] }, "Progress"),
              React.createElement(Text, { style: [styles.tableCell, { fontWeight: "bold" }] }, "Status"),
            ),
            ...data.goals
              .slice(0, 10)
              .map((goal: any, index: number) =>
                React.createElement(
                  View,
                  { key: index, style: styles.tableRow },
                  React.createElement(Text, { style: styles.tableCell }, goal.title),
                  React.createElement(Text, { style: styles.tableCell }, `${goal.progress}%`),
                  React.createElement(Text, { style: styles.tableCell }, goal.status),
                ),
              ),
          ),
      ),
    )

  const pdfBlob = await pdf(PDFDocument()).toBlob()
  return pdfBlob
}

// Helper function to download blob
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
