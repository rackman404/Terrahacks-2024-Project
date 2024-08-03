from PySide6 import QtCore, QtWidgets, QtGui
import PySide6.QtCore
import PySide6.QtWidgets
import sys

import tkinter
from tkinter import filedialog

import MainWindow


class MainWidget(QtWidgets.QMainWindow): #Main Class
    def __init__(self):
        super(MainWidget, self).__init__()
        self.threadpool = QtCore.QThreadPool()

        self.resize(1920, 1080)


        self.mainWindowUI = MainWindow.mainWindowUI()
        self.mainWindowUI.setup(self)

        #intial GUI setup

        self.setWindowTitle("TerraHacks 2024 Submission Placeholder")
        
        widget = QtWidgets.QWidget(self)
        widget.setLayout(self.mainWindowUI.mainLayout)
        self.setCentralWidget(widget)

        #signal - interactions
       


if __name__ == "__main__":
    app = QtWidgets.QApplication([])

    MainWindow = MainWidget()

    MainWindow.show()

    sys.exit(app.exec())
