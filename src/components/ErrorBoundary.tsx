import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
          <div className="mb-4 rounded-full bg-destructive/10 p-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
          <h1 className="mb-2 text-2xl font-bold tracking-tight">Something went wrong</h1>
          <p className="mb-6 max-w-md text-muted-foreground">
            An error occurred while rendering this page. Please try refreshing or contact support if the issue persists.
          </p>
          
          {this.state.error && (
            <div className="mb-6 w-full max-w-lg overflow-auto rounded-md bg-muted p-4 text-left font-mono text-sm">
              <p className="font-bold text-destructive">{this.state.error.toString()}</p>
              {this.state.errorInfo && (
                <pre className="mt-2 text-xs text-muted-foreground">
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </div>
          )}

          <div className="flex gap-4">
            <Button onClick={() => window.location.reload()}>Refresh Page</Button>
            <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
