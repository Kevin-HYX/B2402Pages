package org.kevin.main

import com.google.gson.Gson
import com.google.gson.JsonParser
import org.kevin.io.createChild
import org.kevin.io.moveTo
import java.io.File

/**
 * @author 18145
 * @version 1.0
 */
/**
 * 实现以下功能：
 * 新的文件放到音乐中，会自动同步到new里面，将原文件拷贝到其他目录中
 * 同步时，会把原来new里的文件放到old
 * old超出上限后，会删除一些旧文件
 * 生成new和old的时间，名称
 * 文件名不会改变
 *
 * @param args
 */
fun main(args: Array<String>) {
    //音乐根目录
    val root = File("D:\\Kevin's Java\\B2402Pages\\music")
    val used = File("D:\\UsedMusic")
    val news = File("D:\\Kevin's Java\\B2402Pages\\music\\New")
    val olds = File("D:\\Kevin's Java\\B2402Pages\\music\\Old")
    //所有新文件的列表
    val apFiles = root.listFiles().filter { it.isFile }.toMutableList()
    val newFiles = news.listFiles().filter { it.isFile }.toMutableList()
    val oldFiles = olds.listFiles().filter { it.isFile }.toMutableList()


    //不是空的，生成更新列表

    //防止重复添加
    val newNames = newFiles.map { it.name }
    apFiles.asSequence().filter { newNames.contains(it.name) }
    //空的，或者没有新文件
    if (apFiles.size == 0) {
        println("Nothing Changed")
        return
    }
    //新的newMusic列表
    val newMusics = apFiles.map { Music(it.name) }
    //新的oldMusic列表
    val oldMusics = (newFiles + oldFiles).distinctBy { it.name }.map { Music(it.name) }


    //new放到old去
    newFiles.forEach { it.moveTo(olds) }

    //ap放到new去，让后放到used文件夹去
    apFiles.forEach { it.copyTo(news.createChild(it.name));it.moveTo(used) }

    //合并JSON，为新的oldjson
    val newJsonFile = File("D:\\Kevin's Java\\B2402Pages\\json\\new.json")
    val oldJsonFile = File("D:\\Kevin's Java\\B2402Pages\\json\\old.json")
    val gson = Gson()
    val parser = JsonParser()
    var oldJsonMusic = parser.parse(oldJsonFile.readText())
        .asJsonArray.map {
            gson.fromJson(it, Music::class.java)
        }
    /*
    原来处于new中的文件
     */
    var newJsonMusic = parser.parse(newJsonFile.readText())
        .asJsonArray.map {
            gson.fromJson(it, Music::class.java)
        }
    oldJsonMusic = oldJsonMusic + newJsonMusic
    /*
    这里不直接用oldMusic转换，因为不能改动时间
     */
    /*
    写入新的JSON，以及合并之后的JSON
     */
    oldJsonFile.writeText(oldJsonMusic.convertToJsonString())
    newJsonFile.writeText(newMusics.convertToJsonString())

}

public fun List<Music>.convertToJsonString(): String {
    val g = Gson()

    val b = StringBuffer()
    b.append("[")
    this.forEach {
        b.append(g.toJson(it, Music::class.java).toString())
        b.append(",")
    }

    return b.removeSuffix(",").toString() + "]"

}
