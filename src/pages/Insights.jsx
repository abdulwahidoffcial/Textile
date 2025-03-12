import { useState } from "react"
import { Upload, File, X, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import axios from "axios"

export default function InsightsUpload() {
  const [files, setFiles] = useState([])
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === "dragenter" || e.type === "dragover")
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files)
    handleFiles(selectedFiles)
  }

  const handleFiles = (newFiles) => {
    const validFiles = newFiles.map((file) => ({
      file,
      id: Math.random().toString(36).slice(2),
      progress: 0,
      status: "pending",
    }))
    setFiles((prev) => [...prev, ...validFiles])

    validFiles.forEach((fileObj) => {
      simulateUpload(fileObj.id)
    })
  }

  const simulateUpload = (fileId) => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileId ? { ...f, progress, status: progress === 100 ? "complete" : "uploading" } : f
        )
      )
      if (progress === 100) clearInterval(interval)
    }, 500)
  }

  const removeFile = (fileId) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  const processFiles = async () => {
    try {
      const formData = new FormData();
      
      files.forEach(({ file }) => {
        formData.append("files", file);
      });
  
      const response = await axios.post("/api/file-moving", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
  
      toast.success("Dashboard Created!", {
        description: "Your files have been processed successfully.",
        // action: {
        //   label: "View Dashboard",
        //   onClick: () => window.location.href = "/dashboard"
        // }
      });
    } catch (error) {
      toast.error("Error Processing Files", {
        description: error.response?.data?.message || error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Upload Your Data Files</h1>
          <p className="text-muted-foreground text-lg">
            Upload your files for analysis and insights. We support CSV, Excel, and PDF formats.
          </p>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center
            ${dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"}
            transition-colors duration-200`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Input
            type="file"
            multiple
            className="hidden"
            id="file-upload"
            onChange={handleFileInput}
            accept=".csv,.xlsx,.xls"
          />
          <div className="flex flex-col items-center gap-4">
            <Upload className="h-12 w-12 text-muted-foreground" />
            <label htmlFor="file-upload" className="cursor-pointer text-primary hover:underline">
              <Button variant="default" size="lg" onClick={() => document.getElementById('file-upload').click()}>
                Select Files
              </Button>
            </label>
            <p className="text-muted-foreground">or drop files here</p>
          </div>
        </div>

        {files.length > 0 && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <h2 className="font-semibold mb-4">Uploaded Files</h2>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {files.map(({ file, id, progress }) => (
                    <div key={id} className="flex items-center gap-4 p-3 border rounded-lg">
                      <File className="h-6 w-6 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium">{file.name}</p>
                        <Progress value={progress} className="h-2 mt-2" />
                      </div>
                      <Button variant="ghost" size="icon" className="flex-shrink-0" onClick={() => removeFile(id)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Supported file types: CSV, Excel (.xlsx, .xls). Maximum file size: 50MB per file.
          </AlertDescription>
        </Alert>

        {files.length > 0 && (
          <div className="mt-6 text-center">
            <Button
              size="lg"
              disabled={files.some((f) => f.status !== "complete")}
              onClick={processFiles}
            >
              Process Files
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
