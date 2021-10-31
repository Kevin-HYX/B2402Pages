package org.kevin.io

import java.io.File
import java.nio.file.Files
import java.nio.file.StandardCopyOption

public fun File.createChild(name: String): File {
    val path = "${this.path}\\$name"
    return File(path)
}

public fun File.moveTo(dir: File) {
    val newDir = dir.createChild(this.name)
    Files.move(this.toPath(), newDir.toPath(), StandardCopyOption.REPLACE_EXISTING)
}