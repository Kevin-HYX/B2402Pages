package org.kevin.main

import com.google.gson.Gson
import org.kevin.io.createChild
import java.io.File
import java.io.FileFilter

val musicRoot = File("D:\\Kevin's Java\\B2402Pages\\music")
val jsonRoot = File("D:\\Kevin's Java\\B2402Pages\\json")

fun main() {
    val musicDirections = musicRoot.listFiles(FileFilter { it.isDirectory })!!.map {
        MusicDir(it)
    }

    musicDirections.forEach {
        val jsonString = it.getFileList().convertToJsonString()
        it.jsonFile.writeText(jsonString)
    }


}

class MusicDir(val direction: File) {
    val name: String = direction.name

    var jsonFile:File


    init {
        jsonFile = jsonRoot.createChild("$name.json")
        val success =jsonFile.createNewFile()
        print(success)
    }

    fun getFileList() =
        direction.listFiles(FileFilter { it.name.endsWith(".mp3") })!!
            .map { Song(it!!.name.substringBefore(".mp3")) }
            .toList()
}

data class Song(val name: String)

fun List<Song>.convertToJsonString(): String {
    val g = Gson()
    val b = StringBuffer()
    b.append("[")
    this.forEach {
        b.append(g.toJson(it, Song::class.java).toString())
        b.append(",")
    }
    return b.removeSuffix(",").toString() + "]"
}