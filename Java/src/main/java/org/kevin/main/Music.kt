package org.kevin.main

data class Music(var name: String, val time: Long) {
    constructor(name: String) : this(name, System.nanoTime())

}

